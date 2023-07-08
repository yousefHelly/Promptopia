type User = {
    id: number,
    username: string,
    email: string,
    image: string,
    createdAt: Date,
    prompts: Prompt[]
}
type Prompt = {
    id?: number,
    description: string
    tag: string,
    creatorId?: number,
    createdAt?: Date
    creator?:User
}

type PromptCardProps = {
    prompt: Prompt,
    image?: string,
    username?: string
    email?: string,
    userID?: string,
    handleTagClick: (tag: string)=>void,
    i: number
    handleEdit?: (id: number)=>void, 
    handleDelete?: (id: number) => Promise<void>
}

type FormProps = {
    type: string,
    form: Prompt,
    setForm: (val:Prompt)=>void,
    submitting: boolean,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>)=>Promise<void>
}

type ModalProps = {
    state: boolean,
    setState: (val: boolean)=>void
  }