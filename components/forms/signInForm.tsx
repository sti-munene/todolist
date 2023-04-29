"use client";

import { getProviders, signIn } from "next-auth/react";
import { use } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Button } from "../buttons";

export function SignInForm() {
  const providers = use(getProviders());

  return (
    <div className="w-full flex items-center justify-center">
      <div className="mx-auto w-4/5 md:w-96 rounded-md md:px-4 md:py-8 md:border md:border-white md:border-opacity-5">
        <h5 className="mb-4 font-medium text-2xl">Sign In</h5>

        {providers && (
          <>
            {Object.values(providers).map((provider) => (
              <Button
                width="full"
                onClick={() =>
                  signIn(provider.id, {
                    redirect: true,
                    callbackUrl: "/",
                  })
                }
                key={provider.name}
                className="flex items-center gap-2 mb-2"
              >
                <span>Sign in with {provider.name}</span>

                {provider.name === "GitHub" && (
                  <BsGithub
                    aria-hidden
                    style={{
                      fontSize: "16px",
                    }}
                  />
                )}

                {provider.name === "Google" && (
                  <BsGoogle
                    aria-hidden
                    style={{
                      fontSize: "16px",
                    }}
                  />
                )}
              </Button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
