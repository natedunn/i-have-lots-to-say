import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

const DEFAULTS = {
	newTo: "Github",
	noFucksFor: "CODE",
	justWantTo: "download this stupid fucking application",
};

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
				!!focused && "bg-red-500"
			)}
		>
			{children}
		</span>
	);
};

export function FormAdLib() {
	// Text
	const [newTo, setNewTo] = useState(DEFAULTS.newTo);
	const [noFucksFor, setNoFucksFor] = useState(DEFAULTS.noFucksFor);
	const [justWantTo, setJustWantTo] = useState(DEFAULTS.justWantTo);

	// Utils
	const [disableNewTo, setDisableNewTo] = useState<boolean | "indeterminate">(
		"indeterminate"
	);
	const [textToCopy, setTextToCopy] = useState("");
	const [focus, setFocus] = useState<
		"newTo" | "noFucksFor" | "justWantTo" | null
	>(null);

	const handleCopy = () => {
		const divElement = document.getElementById("text-to-copy");
		const textContent = divElement?.textContent;
		navigator.clipboard.writeText(textContent ?? "");
		setTextToCopy(textContent ?? "");
	};

	useEffect(() => {
		if (textToCopy !== "") {
			const timer = setTimeout(() => {
				setTextToCopy("");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [textToCopy]);

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
			<div className="space-y-4">
				<div className="space-y-3">
					<Label htmlFor="newTo">What are you new to?</Label>
					<Input
						id="newTo"
						placeholder="Github"
						type="text"
						onChange={(e) => setNewTo(e.target.value)}
						disabled={disableNewTo === true}
						onFocus={() => setFocus("newTo")}
						onBlur={() => setFocus(null)}
					/>
					<div className="flex items-center space-x-2">
						<Checkbox
							id="disable-new-to"
							onCheckedChange={(checked) => setDisableNewTo(checked)}
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
				className="mt-8 border-t grid gap-4 p-10 font-mono bg-muted text-zinc-400 text-lg"
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
					<Text focused={focus === "noFucksFor"}>{noFucksFor}</Text>??? MAKE A
					FUCKING SOLUTION AND GIVE IT TO ME. these dumbfucks think that
					everyone is a developer and understands{" "}
					<Text focused={focus === "noFucksFor"}>{noFucksFor}</Text>. well i am
					not and i don't understand it. I only know to download and install
					applications. SO WHY THE FUCK IS THERE{" "}
					<Text focused={focus === "noFucksFor"}>{noFucksFor}</Text>? STUPID
					FUCKING SMELLY NERDS
				</p>
			</div>
			<div className="mt-6 flex items-center gap-3">
				<Button
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						handleCopy();
					}}
				>
					{textToCopy ? "FUCKING COPIED" : "Copy text"}
				</Button>
				{textToCopy && (
					<div>Now go post this on Reddit or some Github issue.</div>
				)}
			</div>
		</div>
	);
}
