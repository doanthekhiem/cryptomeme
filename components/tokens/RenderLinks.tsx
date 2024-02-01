"use client"
import React from 'react';

type SocialLinks = {
    homepage?: string[];
    whitepaper?: string;
    blockchain_site?: string[];
    official_forum_url?: string[];
    chat_url?: string[];
    announcement_url?: string[];
    twitter_screen_name?: string;
    facebook_username?: string;
    bitcointalk_thread_identifier?: any;
    telegram_channel_identifier?: string;
    subreddit_url?: string;
    repos_url?: {
        github?: string[];
        bitbucket?: string[];
    };
};

const RenderLinks: React.FC<{ data: SocialLinks }> = ({ data }) => {
    // Function to render individual link
    const renderLink = (url: string, key: string) => {
        if (!url) return null; // Don't render anything if the URL is empty
        return (
            <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#282828] text-neutral-300 rounded-md whitespace-nowrap px-2 h-5 flex items-center justify-center text-[12px] font-RubikBold"
            >
                {formatUrl(url)}
            </a>
        );
    };

    const formatUrl = (url: string): string => {
        try {
            // Tạo một đối tượng URL mới từ url đầu vào
            const parsedUrl = new URL(url);
            // Lấy hostname (domain name) từ URL.
            let formattedUrl = parsedUrl.hostname;

            // Nếu không phải là domain cấp cao nhất, chúng ta sẽ lấy phần của pathname.
            // Điều này loại bỏ các phần như 'www' hoặc subdomains khác.
            if (formattedUrl.startsWith('www.')) {
                formattedUrl = formattedUrl.substring(4);
            }
            return formattedUrl;
        } catch (error) {
            // Nếu URL không hợp lệ hoặc có lỗi xảy ra, trả về chuỗi gốc.
            return url;
        }
    }

    // Main render function
    const renderLinks = () => {
        let links: JSX.Element[] = [];
        Object.entries(data)?.forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Xử lý khi value là một mảng
                value.filter(Boolean).forEach((url) => {
                    const linkElement = renderLink(url, key);
                    if (linkElement !== null) links.push(linkElement);
                });
            } else if (typeof value === 'string' && value) {
                // Xử lý khi value là một string
                const linkElement = renderLink(value, key);
                if (linkElement !== null) {
                    links.push(linkElement);
                }
            } else if (key === 'repos_url') {
                // Xử lý đối với repos_url
                (Object.entries(value as { github?: string[]; bitbucket?: string[] })).forEach(([repoKey, repoUrls]) => {
                    (repoUrls as string[]).forEach((repoUrl: string) => {
                        const linkElement = renderLink(repoUrl, repoKey);
                        if (linkElement !== null) links.push(linkElement);
                    });
                });
            }
        });
        return links;
    };

    return <div className='flex gap-2 flex-wrap'>{renderLinks()}</div>;
};

export default RenderLinks;

// Usage example
const socialLinksData: SocialLinks = {
    // ... your data object
};

// In your main component file
// <RenderLinks data={socialLinksData} />
