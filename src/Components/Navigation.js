import React from 'react';

const Navigation = ({ handleSignOut }) => {

return (
    <div className='flex justify-end pa3 bg-gray shadow-4'>
        <nav onClick={handleSignOut} className='pa2 f6 black bg-white br2 pointer grow' >
            Sign Out
        </nav>
    </div>
    );
}

export default Navigation;
