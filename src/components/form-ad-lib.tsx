import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

const Text = ({
	children,
	focused = false,
}: PropsWithChildren<{
	focused?: boolean;
}>) => {
	return (
		<span
			className={cn(
				`!text-white underline decoration-zinc-400 underline-offset-2 decoration-2`,
				!!focused && "bg-red-500 no-underline"
			)}
		>
			{children}
		</span>
	);
};

const DEFAULTS = {
	newTo: "Github",
	noFucksFor: "CODE",
	justWantTo: "download this stupid fucking application",
	disableNewTo: true,
};

export function FormAdLib() {
	// Text
	const [newTo, setNewTo] = useState(DEFAULTS.newTo);
	const [noFucksFor, setNoFucksFor] = useState(DEFAULTS.noFucksFor);
	const [justWantTo, setJustWantTo] = useState(DEFAULTS.justWantTo);

	// Utils
	const [mounted, setMounted] = useState(false);
	const [disableNewTo, setDisableNewTo] = useState<boolean>(false);
	const [textCopied, setTextCopied] = useState<boolean>(false);
	const [urlCopied, setURLCopied] = useState<boolean>(false);
	const [focus, setFocus] = useState<
		"newTo" | "noFucksFor" | "justWantTo" | null
	>(null);
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [shareURL, setShareURL] = useState<string | null>(null);

	const handleTextCopy = () => {
		const divElement = document.getElementById("text-to-copy");
		const textContent = divElement?.textContent;
		navigator.clipboard.writeText(textContent ?? "");
		setTextCopied(!!textContent);
	};

	const handleURLCopy = () => {
		if (shareURL) {
			navigator.clipboard.writeText(shareURL);
			setURLCopied(true);
		}
	};

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (mounted) {
			const p = new URLSearchParams(window.location.search);
			if (!!p.get("newTo")) {
				setNewTo(String(p.get("newTo")));
			}
			if (!!p.get("noFucksFor")) {
				setNoFucksFor(String(p.get("noFucksFor")));
			}
			if (!!p.get("justWantTo")) {
				setJustWantTo(String(p.get("justWantTo")));
			}
			if (!!p.get("disabledNewTo")) {
				const isDisabled = p.get("disabledNewTo") === "true" ? true : false;
				setDisableNewTo(isDisabled);
			}
		}
	}, [mounted]);

	useEffect(() => {
		if (
			newTo !== DEFAULTS.newTo ||
			noFucksFor !== DEFAULTS.noFucksFor ||
			justWantTo !== DEFAULTS.justWantTo ||
			disableNewTo !== false
		) {
			setIsDirty(true);
			const url = new URL(
				import.meta.env.MODE === "development"
					? "localhost:4321"
					: "https://i-have-lots-to-say.vercel.app"
			);

			url.searchParams.set("newTo", newTo);
			url.searchParams.set("noFucksFor", noFucksFor);
			url.searchParams.set("justWantTo", justWantTo);
			url.searchParams.set("disabledNewTo", disableNewTo ? "true" : "false");

			setShareURL(url.toString());
		} else {
			setIsDirty(false);
		}
	}, [newTo, noFucksFor, justWantTo, disableNewTo]);

	useEffect(() => {
		if (textCopied) {
			const timer = setTimeout(() => {
				setTextCopied(false);
			}, 1500);

			return () => clearTimeout(timer);
		}

		if (urlCopied) {
			const timer = setTimeout(() => {
				setURLCopied(false);
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, [textCopied, urlCopied]);

	useEffect(() => {
		if (newTo === "") {
			setNewTo(DEFAULTS.newTo);
		}
		if (justWantTo === "") {
			setJustWantTo(DEFAULTS.justWantTo);
		}
		if (noFucksFor === "") {
			setNoFucksFor(DEFAULTS.noFucksFor);
		}
	}, [newTo, justWantTo, noFucksFor]);

	return (
		<div className="w-full">
			<div className="space-y-6">
				<div className="space-y-3">
					<Label htmlFor="newTo">What are you new to?</Label>
					<Input
						id="newTo"
						placeholder="Github"
						type="text"
						onChange={(e) => {
							setNewTo(e.target.value);
						}}
						defaultValue={newTo !== DEFAULTS.newTo ? newTo : ""}
						disabled={disableNewTo === true}
						onFocus={() => setFocus("newTo")}
						onBlur={() => setFocus(null)}
					/>
					<div className="flex items-center space-x-2">
						<Checkbox
							id="disable-new-to"
							onCheckedChange={(checked) => {
								setDisableNewTo(
									checked === "indeterminate" || checked === false
										? false
										: true
								);
							}}
							checked={disableNewTo}
						/>
						<label
							htmlFor="disable-new-to"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Disable this part
						</label>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="noFucksFor">What do you not give a fuck about?</Label>
					<Input
						defaultValue={noFucksFor !== DEFAULTS.noFucksFor ? noFucksFor : ""}
						className="uppercase"
						id="noFucksFor"
						placeholder="CODE"
						type="text"
						onChange={(e) => setNoFucksFor(e.target.value.toUpperCase())}
						onFocus={() => setFocus("noFucksFor")}
						onBlur={() => setFocus(null)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="justWantTo">What is your goal?</Label>
					<Input
						defaultValue={justWantTo !== DEFAULTS.justWantTo ? justWantTo : ""}
						id="justWantTo"
						placeholder="download this stupid fucking application"
						type="text"
						onChange={(e) => setJustWantTo(e.target.value)}
						onFocus={() => setFocus("justWantTo")}
						onBlur={() => setFocus(null)}
					/>
				</div>
			</div>
			<div
				className="mt-8 border-2 border-border grid gap-4 p-10 font-mono bg-card text-zinc-400 text-lg"
				id="text-to-copy"
			>
				<p>
					{disableNewTo !== true && (
						<span>
							I am new to <Text focused={focus === "newTo"}>{newTo}</Text> and{" "}
						</span>
					)}
					I have lots to say
				</p>
				<p>
					I DONT GIVE A FUCK ABOUT THE FUCKING{" "}
					<Text focused={focus === "noFucksFor"}>{noFucksFor}</Text>! i just
					want to <Text focused={focus === "justWantTo"}>{justWantTo}</Text>.
					{` `}
				</p>
				<p>
					WHY IS THERE{" "}
					<Text focused={focus === "noFucksFor"}>{noFucksFor}</Text>??? JUST
					MAKE A FUCKING SOLUTION AND GIVE IT TO ME. these dumbfucks think that
					everyone is a developer and understands{" "}
					<Text focused={focus === "noFucksFor"}>{noFucksFor}</Text>. well i am
					not and i don't understand it. I only know to download and install
					applications. SO WHY THE FUCK IS THERE{" "}
					<Text focused={focus === "noFucksFor"}>{noFucksFor}</Text>? STUPID
					FUCKING SMELLY NERDS
				</p>
			</div>
			<div className="mt-6 flex items-start gap-5 bg-card p-4">
				<Button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						handleTextCopy();
					}}
				>
					{textCopied ? "😡 FUCKING COPIED" : "Copy text"}
				</Button>
				<div className="text-zinc-400">
					Copy the generated text above, and grace the internet with your{" "}
					<span className="italic">correct</span> opinion.
				</div>
			</div>
			{isDirty && shareURL && (
				<div className="mt-6 flex items-start gap-5 bg-card p-4">
					<Button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							handleURLCopy();
						}}
					>
						{urlCopied ? "😡 FUCKING COPIED" : "Copy link"}
					</Button>
					<Textarea className="resize-none" value={shareURL} readOnly />
				</div>
			)}
		</div>
	);
}
