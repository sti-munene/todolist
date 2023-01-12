"use client";

import React, { use } from "react";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { getProviders, signIn, useSession } from "next-auth/react";
import { ProviderType } from "next-auth/providers";
import { BsGithub } from "react-icons/bs";
import { Button } from "../../../components/buttons";
import { useRouter } from "next/navigation";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

function SignInPage() {
  const providers = use(getProviders());
  // const router = useRouter();

  // const { status } = useSession();

  // if (status === "loading") {
  //   return (
  //     <>
  //       <p>Loading or not authenticated...</p>
  //     </>
  //   );
  // }

  return (
    <div className="providers-wrapper w-full flex items-center justify-center">
      <div className="mx-auto w-fit py-8 px-4 md:px-8 rounded-lg border border-white border-opacity-5">
        {providers && (
          <>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button provider={provider}>
                  <span>Sign in with {provider.name}</span>
                  {provider.name === "GitHub" && (
                    <BsGithub
                      style={{
                        fontSize: "16px",
                      }}
                    />
                  )}
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default SignInPage;
