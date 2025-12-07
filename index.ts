import { build, manifest, code} from 'browserrc'

Object.assign(manifest, {
    name: "Easy Copy",
    description: "Copy things easiliy",
    version: "0.0.1",
    permissions: ['clipboardWrite', 'offscreen', 'tabs'],
})

manifest.action = {
    default_title: "Easy Copy",
    onClick: async () => {

        // Get the current active tab if the passed tab is undefined or incomplete
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];
        
        if (!tab) {
            throw new Error('No active tab found');
        }

        // get the url and title from the tab
        const mdLink = `[${tab.title}](${tab.url})`

        await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['CLIPBOARD'],
            justification: 'Copying to clipboard',
        });

        await chrome.runtime.sendMessage({
            type: 'copy',
            data: mdLink,
        });
        
        await chrome.offscreen.closeDocument();
    }
}


code('offscreen.html', `
    <textarea id="textArea"></textarea>
    <script src="offscreen.js"></script>
`)

code('offscreen.js', () => {
    onMessage('copy', (data: string) => {
        const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
        textArea.value = data;
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
    })
})


build({
    platforms: {
        chrome: true,
        firefox: true
    },
    outputDir: "dist"
})


