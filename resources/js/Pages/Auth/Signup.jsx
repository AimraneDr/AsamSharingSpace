import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import SingleFormLayout from '@/Layouts/SingleFormLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        tel: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('attempt-signup'));
    };

    return (
        <SingleFormLayout>
            <Head title="Register" />

            <form onSubmit={submit}
                className='bg-white shadow flex flex-col p-2 m-0 border-2 rounded-xl max-w-[500px] w-min-[250px] w-full'>

                <h2 className="font-bold text-3xl mb-8 mx-auto">
                    Sign Up
                    <div className="w-fill h-1 bg-[#d53369] m-auto rounded-b-full"></div>
                </h2>
                <InputLabel htmlFor="firstname" value="Firstname" />

                <TextInput
                    id="firstname"
                    name="firstname"
                    value={data.firstname}
                    className="p-2 border-2 border-black rounded-lg mb-4"
                    autoComplete="firstname"
                    isFocused={true}
                    onChange={(e) => setData('firstname', e.target.value)}
                    required
                />

                <InputError message={errors.firstname} className="mt-2" />

                <InputLabel htmlFor="lastname" value="Lastname" />

                <TextInput
                    id="lastname"
                    name="lastname"
                    value={data.lasttname}
                    className="p-2 border-2 border-black rounded-lg mb-4"
                    autoComplete="lastname"
                    isFocused={true}
                    onChange={(e) => setData('lastname', e.target.value)}
                    required
                />

                <InputError message={errors.lastname} className="mt-2" />

                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="p-2 border-2 border-black rounded-lg mb-4"
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />

                <InputError message={errors.email} className="mt-2" />

                <InputLabel htmlFor="tel" value="Phone Number" />

                <TextInput
                    id="tel"
                    type="tel"
                    name="tel"
                    value={data.tel}
                    className="p-2 border-2 border-black rounded-lg mb-4"
                    autoComplete="tel"
                    onChange={(e) => setData('tel', e.target.value)}
                    required
                />

                <InputError message={errors.tel} className="mt-2" />

                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="p-2 border-2 border-black rounded-lg mb-4"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    required
                />

                <InputError message={errors.password} className="mt-2" />

                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="p-2 border-2 border-black rounded-lg mb-4"
                    autoComplete="new-password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                />

                <InputError message={errors.password_confirmation} className="mt-2" />

                <div className="flex p-2 gap-4 flex-row-reverse">
                    <input type="submit" value="Sign up" className="px-4 py-2 rounded-full bg-[#d53369] text-white font-bold hover:bg-transparent hover:text-[#d53369] hover:font-extrabold border-2 border-[#d53369] transition-all duration-200 ease-in-out"/>
                    <input type="reset" value="clear" className="px-4 py-2 rounded-full  text-white bg-amber-500 font-bold hover:bg-transparent hover:text-amber-500 hover:font-extrabold border-2 border-amber-500 transition-all duration-200 ease-in-out"/>
                </div>

                <div className="flex flex-row-reverse p-2">
                    <span>Already have an account 
                        <a href={route('login')} className="underline text-[#d53369]">Login</a>
                    </span>
                </div>
            </form>
        </SingleFormLayout>
    );
}
