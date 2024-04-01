import { useAuthStore } from '@/store/session.store';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserInfos = () => {

    const session = useAuthStore(state => state.session);
    if (!session) {
        return <div>Please log in to see user information</div>;
    }

    const { email, avatar_url, full_name } = session.user.user_metadata;

    return (
        <div className="user-infos">
            {avatar_url && (
                <div className='flex gap-4 items-center'>
                    <Avatar>
                        <AvatarImage src={avatar_url} />
                        <AvatarFallback>Loading...</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-sm font-extrabold'>{full_name}</h3>
                        <h3 className='text-[10px] font-light tracking-wider'>{email}</h3>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserInfos