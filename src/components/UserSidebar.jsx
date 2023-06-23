import React, { useState } from 'react'
import Flex from './layouts/Flex'
import SearchInput from './layouts/SearchInput'
import ChatLayout from './layouts/ChatLayout'
import Input from "../components/layouts/Input";
const UserSidebar = () => {
    const [createGroupShow, setCreateGroupShow] = useState(false)
    return (<>
        {createGroupShow && (
            <div className="w-screen h-screen fixed bg-[rgba(50,55,92,0.35)] flex justify-center items-center z-10">
                <Flex className="w-[500px] bg-primary rounded-lg p-7 shadow-primary_shadow flex-col items-center gap-y-4">
                    <div className=" w-full text-white ">
                        <Input inputClass="text-black rounded-md" type="text"
                            label="Group Name" />
                        <p className="text-sm font-medium text-red-500 font-inter">
                            {error ? error : ""}
                        </p>
                        <Input inputClass="text-black rounded-md" type="text"
                            label="Group Tagline" />
                        <p className="text-sm font-medium text-red-500 font-inter">
                            {error ? error : ""}
                        </p>
                    </div>
                    <button
                        className="w-full py-2 text-lg font-semibold text-white capitalize bg-red-500 rounded-lg font-inter "
                        onClick={() => {
                            setCreateGroupShow(false), setPassword("");
                        }}
                    >
                        cancel
                    </button>
                </Flex>
            </div>
        )}
        <Flex className="h-screen flex-col py-[50px]  w-[430px] pr-4  border-r-2 border-[#D3D3D3]">
            <Flex className="justify-between mb-6">
                <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
                    Group
                </h2>
                <button className='text-primary font-inter font-semibold text-lg border-[2px] border-primary py-[10px] px-6 rounded-md' onClick={() => setCreateGroupShow(true)}>Create Group</button>
            </Flex>
            <SearchInput />
            <div className='h-screen  overflow-y-auto'>
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />
                <ChatLayout
                    src="../../../public/assets/chat.png"
                    name="Jenny Wilson"
                    message="Love You....."
                    time="10:30 PM"
                />

            </div>
        </Flex>
    </>

    )
}

export default UserSidebar