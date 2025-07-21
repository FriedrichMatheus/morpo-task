import React, { PropsWithChildren } from "react";

interface TooltipProps extends PropsWithChildren {
    text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-background-main text-white text-xs rounded py-1 px-2 z-10">
                {text}
            </div>
        </div>
    );
};

export { Tooltip };
