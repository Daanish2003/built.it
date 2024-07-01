"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/logout'
import { useSession } from '@/providers/sessionProvider'
import IdeaDialog from '../ideas/ideaDialog'




const Navbar = () => {
  const router = useRouter();
  const {user , session} = useSession()

  function handleClick() {
    router.push('/auth/login')
  }


  const logoutHandle = async () => {
    const res = await logout();
    if(res.error) {
       console.log(res.error)
    } else if (res.success) {
      console.log(res.message)
      router.push("/")

    }
  }

  return (
    <nav className="flex justify-between items-center border-b-2 border-gray-300 px-12">
        <Link href="/"><Image src="/logo.png" width={200} height={200} alt="built.it"/></Link>
        <div className='space-x-4'>
           <IdeaDialog />
            {
              session ? (
              <Button size="lg" onClick={() => logoutHandle()}>Logout</Button>
              ): (
                <Button size="lg" onClick={() => handleClick()}>Login</Button>
              )
            }
        </div>
    </nav>
  )
}

export default Navbar