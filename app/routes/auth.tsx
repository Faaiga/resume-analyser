import React from 'react'
import {useEffect} from "react";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Authentication' },
    {
        name: 'description',
        content: 'Log into your account'
    },
])

const Auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1]
    const navigate = useNavigate();

    useEffect(() => {
            if (auth.isAuthenticated) navigate(next);
        }, [auth.isAuthenticated]
    )
    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center justify-center">
            <div className="gradient-border shadow-1g">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log in to Continue</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button> ) : (
                          <>
                              {auth.isAuthenticated ? (
                                  <button className="auth-button" onClick={auth.signOut}>
                                      <p>Log Out</p>
                                  </button>
                              ): (
                                  <>
                                  <button className="auth-button" onClick={auth.signIn}>
                                      <p>Log In</p>
                                  </button>
                                  </>
                              )}
                          </>
                        )
                        }
                    </div>
                </section>
            </div>
            <div className="flex items-center justify-center m-8">
                <h3 className="text-sm">RAzer @2025 | developed by Faaiga | All Rights Reserved</h3>
            </div>
        </main>
    )
}

export default Auth