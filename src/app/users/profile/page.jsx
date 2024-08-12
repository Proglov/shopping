import Profile from "@/components/users/profile/Profile";

export default function ProfilePage({ searchParams }) {
  return (
    <Profile tab={searchParams?.tab || 'specifications'} />
  );
}
