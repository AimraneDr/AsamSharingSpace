import GuestFooter from '@/Components/Guest/GuestFooter';
import GuestNav from '@/Components/Guest/GuestNav';


export default function GuestLayout({ children }) {

    return (
        <div className="leading-normal tracking-normal text-white gradient">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}
            <GuestNav />
            <div className={`pt-24 `}>
                {children}
            </div>
            <GuestFooter />
        </div>
    );
}
