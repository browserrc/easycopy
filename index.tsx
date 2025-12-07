import { build, manifest, code, html } from 'browserrc'

manifest.assign({
    name: "Easy Copy",
    description: "Copy things easiliy",
    version: "0.0.1",
    permissions: ['clipboardWrite', 'offscreen', 'tabs'],
    action: async () => {
        const tab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
        const mdLink = `[${tab?.title}](${tab?.url})`

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
})


html('offscreen.html', 
    <body>
        <textarea id="textArea"></textarea>
        <script src="offscreen.js"></script>
    </body>
)

code('offscreen.js', () => {
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'copy') {
            const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
            textArea.value = message.data;
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
        }
    })
})

build({
    platforms: {
        chrome: true
    },
    outputDir: "dist"
})


