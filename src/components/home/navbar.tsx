"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import IdeaDialog from '../ideas/ideaDialog'
import { LogoutButton } from '../auth/logoutButton'
import { useSession } from '@/providers/sessionProvider'

const Navbar = () => {
  const { session } = useSession()
  const router = useRouter();
  function handleClick() {
    console.log('clicked')
    router.push('/auth/login')
  }

  return (
    <nav className="flex justify-between items-center border-b-2 border-gray-300 px-12">
        <Link href="/"><Image src="/logo.png" width={200} height={200} alt="built.it"/></Link>
        <div className='space-x-4'>
           <IdeaDialog />
          {session ? (<LogoutButton>Logout</LogoutButton >) : (<Button size="lg" onClick={() => handleClick()}>Login</Button>
          )}
        </div>
    </nav>
  )
}

export default Navbar