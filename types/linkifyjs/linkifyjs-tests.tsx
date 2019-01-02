import * as React from "react";
import * as ReactDOM from "react-dom";
import { LinkifyOptions } from "linkifyjs";
import linkifyHtml from "linkifyjs/html";
import Linkify from "linkifyjs/react";

declare function describe(desc: string, f: () => void): void;

describe("linkifyjs/html", () => {
    // From the docs here: https://soapbox.github.io/linkifyjs/docs/options.html

    /* attributes */

    linkifyHtml("github.com", {
        attributes: {
            rel: "nofollow"
        }
    });

    /* className */

    linkifyHtml("github.com", {
        className: "new-link--url"
    });

    linkifyHtml("github.com", {
        className(href, type) {
            return "new-link--" + type;
        }
    });

    linkifyHtml("github.com", {
        className: {
            url: "new-link--url",
            email(href: string) {
                return "new-link--email";
            }
        }
    });

    /* events */

    linkifyHtml("", {
        events: {
            click(e) {
                alert("Link clicked!");
            },
            mouseover(e) {
                alert("Link hovered!");
            }
        }
    });

    /* defaultProtocol */

    /* format */

    linkifyHtml("", {
        format(value, type) {
            if (type === "url" && value.length > 50) {
                value = value.slice(0, 50) + "…";
            }
            return value;
        }
    });

    linkifyHtml("", {
        format: {
            url(value) {
                return value.length > 50 ? value.slice(0, 50) + "…" : value;
            }
        }
    });

    /* formatHref */

    linkifyHtml("This site is #rad", {
        formatHref(href, type) {
            if (type === "hashtag") {
                href = "https://twitter.com/hashtag/" + href.substring(1);
            }
            return href;
        }
    });

    linkifyHtml("Hey @dhh, check out issue #23", {
        formatHref: {
            mention(href) {
                return "https://github.com" + href;
            },
            ticket(href) {
                return (
                    "https://github.com/SoapBox/linkifyjs/issues/" +
                    href.substring(1)
                );
            }
        }
    });

    /* ignoreTags */

    linkifyHtml(
        // tslint:disable-next-line:prefer-template
        'Please ignore <script>var a = {}; a.com = "Hi";</script> \n' +
            "but do <span>b.ca</span>",
        {
            ignoreTags: ["script", "style"]
        }
    );

    /* nl2br */

    /* tagName */

    linkifyHtml("github.com", {
        tagName: "span"
    });

    linkifyHtml("#swag", {
        tagName: {
            hashtag: "span"
        }
    });

    /* target */

    linkifyHtml("github.com", {
        target: "_parent"
    });

    linkifyHtml("test-email@example.com", {
        target: {
            url: "_parent",
            email: null
        }
    });

    /* validate */

    // Don't linkify links that don't begin in a protocol
    // e.g., "http://google.com" will be linkified, but "google.com" will not.
    linkifyHtml("www.google.com", {
        validate: {
            url(value) {
                return /^(http|ftp)s?:\/\//.test(value);
            }
        }
    });
});

describe("linkifyjs/react", () => {
    // From the docs here: https://soapbox.github.io/linkifyjs/docs/linkify-react.html

    /* Usage */

    {
        // render()
        const options = {
            /* … */
        };
        const content =
            "For help with GitHub.com, please email support@github.com";
        <Linkify tagName="p" options={options}>
            {content}
        </Linkify>;
    }

    /* Events */

    {
        const content =
            "For help with GitHub.com, please email support@github.com";
        const linkProps = {
            onClick: (event: any) => {
                if (!confirm("Are you sure you want to leave this page?")) {
                    event.preventDefault();
                }
            }
        };
        <Linkify options={{ attributes: linkProps }}>{content}</Linkify>;
    }

    /* A few more test cases */

    /* Default values for all props */
    {
        <Linkify>
            <span>Hello https://google.com</span>
        </Linkify>
    }
            
    /* Custom class name */

    {
        <Linkify options= {{
            className: "custom-class-name"
        }}>
            <span>Hello https://google.com</span>
        </Linkify>
    }

    /* Custom tag name */

    {
        <Linkify options= {{
            tagName: "p"
        }}>
            <span>Hello https://google.com</span>
        </Linkify>
    }
});
