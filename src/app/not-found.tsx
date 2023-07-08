import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='mx-auto flex flex-col items-center justify-center gap-3'>
      <h2 className='head_text'>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link className='blue_gradient' href="/">all Prompts</Link>
      </p>
    </div>
  )
}