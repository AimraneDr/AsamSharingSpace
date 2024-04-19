import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import SingleFormLayout from '@/Layouts/SingleFormLayout';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('attempt-login'));
    };

    return (
        <SingleFormLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}
                className='bg-white shadow flex flex-col p-4 border-2 rounded-xl max-w-[500px] w-min-[250px] w-full'>
                <h2 className="font-bold text-3xl mb-8 mx-auto">
                    login
                    <div className="w-fill h-1 bg-[#d53369] m-auto rounded-b-full"></div>
                </h2>
                    <InputLabel htmlFor="email" value="Email" className='font-black'/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="p-2 border-2 border-black rounded-lg mb-4"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="text-red-500" />

                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />


                    <label className="p-4">
                        <Checkbox name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="outline-none accent-[#d53369]"/> 
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>

                <div className="flex p-2 gap-4 flex-row justify-end max-sm:justify-center">
                    <input type="reset" value="clear"
                        className="px-4 py-2 rounded-full  text-white bg-amber-500 font-bold hover:bg-transparent hover:text-amber-500 hover:font-extrabold border-2 border-amber-500 transition-all duration-200 ease-in-out"/>
                    <input type="submit" value="Login" disabled={processing}
                        className="px-4 py-2 rounded-full bg-[#d53369] text-white font-bold hover:bg-transparent hover:text-[#d53369] hover:font-extrabold border-2 border-[#d53369] transition-all duration-200 ease-in-out"/>
                </div>
                <div className="flex p-2 justify-between flex-row-reverse max-sm:flex-col max-sm:items-center">
                    <span>Don't have an account. 
                        <a href={route('signup')} className="underline text-[#d53369]">sign up</a>
                    </span>
                    <a href={route('signup')} className="underline text-[#d53369]">Forget my password.</a>
                </div>
            </form>
        </SingleFormLayout>
    );
}
