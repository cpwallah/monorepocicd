export default async function Home() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Error loading user</div>;
  }

  const user = await res.json();

  return (
    <div>
      <h1>User</h1>
      <div>
        name:
        <strong>Username:</strong> {user.Username} <br />
        password:
{/*         <strong>Password:</strong> {user.password} */}
      </div>
    </div>
  );
}