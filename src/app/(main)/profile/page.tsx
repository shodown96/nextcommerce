import { ProfileUpdateParamsType } from '@/lib/validations/user';
import UpdateProfileForm from '@/components/forms/update-profile-form';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

function UpdateProfilePage() {
    const handleRemoteSubmit = async (values: ProfileUpdateParamsType) => {
        const user = await currentUser()
        if (user) {
           await clerkClient.users.updateUser(
                user.id, {
                firstName: values.firstName,
                lastName: values.lastName,
            })
            if (values.image) {
              await  clerkClient.users.updateUserProfileImage(user.id, {
                    file:values.image
                })
            }
        }
    }
    return (
        <div></div>
        // <UpdateProfileForm handleRemoteSubmit={handleRemoteSubmit} />
    )
}

export default UpdateProfilePage