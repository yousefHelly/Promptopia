export default function Copy (prompt: Prompt, setCopied: (val: string)=>void) {
        setCopied(prompt.description)
        navigator.clipboard.writeText(prompt.description)
        setTimeout(()=>setCopied(''),3000)
}