import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { LoaderPinwheel } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.map(skill => skill) || '',
        file: user?.profile?.resume || ''
    })
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        }
        catch {
            toast.error(error.response.data.message)
            console.log(error)
        }
        finally {
            setOpen(false);
            setLoading(false)
        }
    }


    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[450px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className=" grid items-center grid-cols-4 gap-4 py-4">
                        <Label htmlFor='name' className='text-right'>Name</Label>
                        <Input onChange={changeEventHandler} type='text' value={input.fullname} id='name' className='col-span-3' name='name' />
                    </div>
                    <div className=" grid items-center grid-cols-4 gap-4 py-4">
                        <Label htmlFor='email' className='text-right'>Email</Label>
                        <Input onChange={changeEventHandler} type='email' value={input.email} id='email' className='col-span-3' name='email' />
                    </div>
                    <div className=" grid items-center grid-cols-4 gap-4 py-4">
                        <Label htmlFor='phoneNumber' className='text-right'>Phone</Label>
                        <Input onChange={changeEventHandler} type='text' value={input.phoneNumber} id='phoneNumber' className='col-span-3' name='phoneNumber' />
                    </div>
                    <div className=" grid items-center grid-cols-4 gap-4 py-4">
                        <Label htmlFor='bio' className='text-right'>Bio</Label>
                        <Input onChange={changeEventHandler} type='text' value={input.bio} id='bio' className='col-span-3' name='bio' />
                    </div>
                    <div className=" grid items-center grid-cols-4 gap-4 py-4">
                        <Label htmlFor='skills' className='text-right'>Skills</Label>
                        <Input onChange={changeEventHandler} type='text' value={input.skills} id='skills' className='col-span-3' name='skills' />
                    </div>
                    <div className=" grid items-center grid-cols-4 gap-4 py-4">
                        <Label htmlFor='file' className='text-right'>Resume</Label>
                        <Input id='file' type='file' onChange={changeFileHandler} accept='application/pdf' className='col-span-3' name='file' />
                    </div>
                    <DialogFooter className={'gap-2'}>
                        <Button className='rounded-full' variant='destructive' onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type='submit' disabled={loading} className='bg-[#7209b7] rounded-full'>{loading ? <LoaderPinwheel className='mr-2 w-4 h-4 animate-spin' /> : 'Submit'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
