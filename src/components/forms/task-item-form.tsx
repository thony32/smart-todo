import { useParams } from "@tanstack/react-router"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

const validationSchema = Yup.object({
    description: Yup.string().required("Required"),
})

const AddTaskItemForm = () => {
    const { todo_id } = useParams({ strict: false }) as any
    const [isAdding, setIsAdding] = useState(false)

    const formik = useFormik({
        initialValues: {
            description: "",
            note: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setIsAdding(true)
                console.log(values)
                formik.resetForm()
            } catch (error) {
                console.error(error)
            } finally {
                setIsAdding(false)
            }
        },
    })
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-semibold first-letter:text-2xl">Add things to do {todo_id}</h1>
            </div>
            <div>
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <div className="flex justify-between">
                            <Label htmlFor="email">Description</Label>
                            {formik.touched.description && formik.errors.description && <div className="text-xs text-error">{formik.errors.description}</div>}
                        </div>
                        <Input
                            className={`${formik.touched.description && formik.errors.description ? "border-error focus-visible:ring-error" : ""}`}
                            type="text"
                            id="name"
                            placeholder="Things to do"
                            {...formik.getFieldProps("description")}
                        />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <div className="flex justify-between">
                            <Label htmlFor="description">Note</Label>
                        </div>
                        <Textarea placeholder="Some note for this todo" id="description" {...formik.getFieldProps("note")} />
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
        </div>
    )
}

export default AddTaskItemForm