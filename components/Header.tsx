// Header.tsx
import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    let navbar = (
        <div className={"navbar bg-base-200"}>
            <div className={"flex-1 p-2"}><div className={"normal-case font-bold text-xl"}>Task Tracker</div></div>
            <div className="btn btn-ghost">
                <Link href="/">
                    <a className="bold" onClick={() => sessionStorage.removeItem("username")}
                       data-active={isActive("/")}>
                        Logout
                    </a>
                </Link>
            </div>
        </div>
    );

    return (
        <nav>
            {navbar}
        </nav>
    );
};

export default Header;
