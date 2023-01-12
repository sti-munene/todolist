import { unstable_getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import React, { use } from "react";
import { BsGithub } from "react-icons/bs";
import { Button } from "../../components/buttons";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

function MyAccount() {
  const session = use(unstable_getServerSession(authOptions));
  const providers = use(getProviders());

  if (!session) {
    return (
      <div className="providers-wrapper w-full flex items-center justify-center">
        <div className="flex flex-col items-center mx-auto w-fit py-8 px-4 rounded-lg border border-white border-opacity-5">
          <div className="w-full flex items-center justify-center text-sm mb-4 px-4 py-1 rounded-md bg-blue-500 bg-opacity-10 text-blue-600">
            <p>Login to Continue</p>
          </div>

          <Button provider={providers?.github}>
            <span>Sign in with GitHub</span>
            <BsGithub
              style={{
                fontSize: "16px",
              }}
            />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
      className="flex flex-col items-start justify-center gap-4"
    >
      {session?.user && (
        <>
          {session?.user?.image && (
            <>
              <Image
                src={session?.user?.image}
                alt="User Profile"
                height={150}
                width={150}
                className="rounded-full"
              />
            </>
          )}

          <div>
            <h4 className="text-2xl font-light">{session?.user?.name}</h4>
            <p className="text-sm font-light">{session?.user?.email}</p>
          </div>
        </>
      )}
    </main>
  );
}

export default MyAccount;
