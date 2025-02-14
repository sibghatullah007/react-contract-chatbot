import Link from "next/link"

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <Link href="/">
    <h1 className="text-xl font-bold">JCT Giant</h1>
    </Link>
    <nav className="space-x-6">
      <Link href="/chat" className="bg-black text-white px-4 py-2 rounded hover:text-gray-100">Get Started</Link>
    </nav>
  </header>
  )
}

export default Header