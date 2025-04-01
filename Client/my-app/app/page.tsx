import { getSession } from "@auth0/nextjs-auth0";


const Page = async ()=> {

  const Session = await getSession();
  const user = Session?.user;

  if(user){
    return (
      <>
      <img
        src={user.picture}
        alt={user.name}
        width={100}
        height={100}
        className="rounded-full"
      />
      <h1 className="text-3xl font-bold pt-10 mx-auto text-center">
        Hello {user.name}! WellCome to Apex
      </h1>
      <p>{user.email}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <a href="/api/auth/logout">Logout</a>
      </button>
      </>
    )   
  }

  return (
    <>
    <h1 className="text-3xl font-bold pt-10 mx-auto text-center">
      Hello Apex!
    </h1>

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <a href="/api/auth/login">Login</a>
    </button>
    </>
    
  );

}
export default Page