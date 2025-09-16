import SideMenu from "@/components/side-menu"
import AccountDetails from "@/components/account-details"

export default function AccountDetailsPage() {
  return (
    <div className="flex h-screen bg-white">
      <SideMenu />
      <main className="flex-1">
        <AccountDetails />
      </main>
    </div>
  )
}
