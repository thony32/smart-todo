import { useAuthStore } from "@/store/session.store"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import TodoService from "@/services/TodoService"
import Todo from "@/models/Todo"
import toast from "react-hot-toast"

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
})

const AddTaskForm = () => {
    const session = useAuthStore((state) => state.session)
    const user_id = session?.user.id
    const [isAdding, setIsAdding] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const data: Todo = {
                user_id: user_id,
                name: values.name,
                description: values.description,
            }
            try {
                setIsAdding(true)
                await TodoService.createTodo(data)

                toast.success("TODO added successfully !", {
                    duration: 3000,
                    position: "bottom-center",
                    className: "bg-success text-white",
                })
            } catch (error) {
                console.error(error)
            } finally {
                formik.resetForm()
                setIsAdding(false)
            }
        },
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-semibold first-letter:text-2xl">Ajout something you should do!</h1>
            </div>
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <div className="flex justify-between">
                        <Label htmlFor="email">Task</Label>
                        {formik.touched.name && formik.errors.name && <div className="text-xs text-error">{formik.errors.name}</div>}
                    </div>
                    <Input
                        className={`${formik.touched.name && formik.errors.name ? "border-error focus-visible:ring-error" : ""}`}
                        type="text"
                        id="name"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                    />
                </div>
                <div className="grid w-full gap-1.5">
                    <div className="flex justify-between">
                        <Label htmlFor="description">Description</Label>
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-xs text-error">{formik.errors.description}</div>
                        )}
                    </div>
                    <Textarea
                        className={`${formik.touched.description && formik.errors.description ? "border-error focus-visible:ring-error" : ""}`}
                        placeholder="Description of the todo"
                        id="description"
                        {...formik.getFieldProps("description")}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        className="bg-success hover:bg-success/75 text-success-content flex gap-2 items-center active:scale-95 duration-300"
                        type="submit"
                    >
                        Ajouter
                        {isAdding && <span className="loading loading-ring loading-md"></span>}
                    </Button>
                    <Button type="button" variant="destructive" onClick={() => formik.resetForm()}>
                        Clear
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddTaskForm
