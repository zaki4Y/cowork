import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Typewriter } from '@/Components/UI/typewriter';
import Label from '@/Components/UI/ui-label';
import { Input, PasswordInput } from '@/Components/UI/ui-input';
import Button from '@/Components/UI/ui-button';

function SignInForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
                <span className="font-display text-sm font-bold uppercase tracking-[0.32em]">Aurelia</span>
                <h1 className="text-2xl font-display font-medium">Sign in to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">Enter your email below to sign in</p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="si-email">Email</Label>
                    <Input
                        id="si-email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <PasswordInput
                    name="password"
                    label="Password"
                    required
                    autoComplete="current-password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="si-remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    <Label htmlFor="si-remember" className="text-sm font-normal">Remember me</Label>
                </div>
                <Button type="submit" variant="outline" className="mt-2" disabled={processing}>
                    {processing ? 'Signing in...' : 'Sign In'}
                </Button>
            </div>
        </form>
    );
}

function SignUpForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
                <span className="font-display text-sm font-bold uppercase tracking-[0.32em]">Aurelia</span>
                <h1 className="text-2xl font-display font-medium">Create an account</h1>
                <p className="text-balance text-sm text-muted-foreground">Enter your details below to sign up</p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-1">
                    <Label htmlFor="su-name">Full Name</Label>
                    <Input
                        id="su-name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="su-email">Email</Label>
                    <Input
                        id="su-email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <PasswordInput
                    name="password"
                    label="Password"
                    required
                    autoComplete="new-password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                <div className="grid gap-1">
                    <Label htmlFor="su-password-confirm">Confirm Password</Label>
                    <Input
                        id="su-password-confirm"
                        name="password_confirmation"
                        type="password"
                        placeholder="Repeat your password"
                        required
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
                </div>
                <Button type="submit" variant="outline" className="mt-2" disabled={processing}>
                    {processing ? 'Creating account...' : 'Sign Up'}
                </Button>
            </div>
        </form>
    );
}

export function AuthUI({ mode = 'signin' }) {
    const isSignIn = mode === 'signin';

    const imageSrc = '/images/hero.jpg';

    const quoteText = isSignIn
        ? 'Welcome back. The atelier awaits.'
        : 'Create an account. A new chapter begins.';

    const quoteAuthor = 'Aurelia';

    return (
        <div className="w-full min-h-screen md:grid md:grid-cols-2">
            <style>{`
                input[type="password"]::-ms-reveal,
                input[type="password"]::-ms-clear {
                    display: none;
                }
            `}</style>

            <div className="flex h-screen items-center justify-center p-6 md:h-auto md:p-0 md:py-12">
                <div className="mx-auto grid w-[350px] gap-2">
                    {isSignIn ? <SignInForm /> : <SignUpForm />}

                    <div className="text-center text-sm">
                        {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <Link
                            href={isSignIn ? route('register') : route('login')}
                            className="font-medium text-foreground underline-offset-4 hover:underline pl-1"
                        >
                            {isSignIn ? 'Sign up' : 'Sign in'}
                        </Link>
                    </div>

                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>

                    <Button variant="outline" type="button" className="w-full">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google icon"
                            className="mr-2 h-4 w-4"
                        />
                        Continue with Google
                    </Button>
                </div>
            </div>

            <div
                className="hidden md:block relative bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{ backgroundImage: `url(${imageSrc})` }}
                key={imageSrc}
            >
                <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-background to-transparent" />

                <div className="relative z-10 flex h-full flex-col items-center justify-end p-2 pb-6">
                    <blockquote className="space-y-2 text-center text-foreground">
                        <p className="text-lg font-medium">
                            &ldquo;
                            <Typewriter
                                key={quoteText}
                                text={quoteText}
                                speed={60}
                            />
                            &rdquo;
                        </p>
                        <cite className="block text-sm font-light text-muted-foreground not-italic">
                            &mdash; {quoteAuthor}
                        </cite>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
