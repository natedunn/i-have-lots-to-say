import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Checkbox } from "./ui/checkbox";

const DEFAULTS = {
	newTo: "Github",
	noFucksFor: "CODE",
	justWantTo: "download this stupid fucking application",
};

const Text = ({ children }: PropsWithChildren) => {
	return (
		<span className="!text-white underline decoration-zinc-400 underline-offset-2 decoration-2">
			{children}
		</span>
	);
};

export function FormAdLib() {
	const [newTo, setNewTo] = useState(DEFAULTS.newTo);
	const [disableNewTo, setDisableNewTo] = useState<boolean | "indeterminate">(
		"indeterminate"
	);
	const [noFucksFor, setNoFucksFor] = useState(DEFAULTS.noFucksFor);
	const [justWantTo, setJustWantTo] = useState(DEFAULTS.justWantTo);
	const [textToCopy, setTextToCopy] = useState("");

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
					<Label htmlFor="new-to">What are you new to?</Label>
					<Input
						id="new-to"
						placeholder="Github"
						type="text"
						onChange={(e) => setNewTo(e.target.value)}
						disabled={disableNewTo === true}
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
					<Label htmlFor="no-fucks-for">
						What do you not give a fuck about?
					</Label>
					<Input
						className="uppercase"
						id="no-fucks-for"
						placeholder="CODE"
						type="text"
						onChange={(e) => setNoFucksFor(e.target.value.toUpperCase())}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="just-want-to">What is your goal?</Label>
					<Input
						id="just-want-to"
						placeholder="download this stupid fucking application"
						type="text"
						onChange={(e) => setJustWantTo(e.target.value)}
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
							I am new to <Text>{newTo}</Text> and{" "}
						</span>
					)}
					I have lots to say
				</p>
				<p>
					I DONT GIVE A FUCK ABOUT THE FUCKING <Text>{noFucksFor}</Text>! i just
					want to <Text>{justWantTo}</Text>.{` `}
				</p>
				<p>
					WHY IS THERE <Text>{noFucksFor}</Text>??? MAKE A FUCKING SOLUTION AND
					GIVE IT TO ME. these dumbfucks think that everyone is a developer and
					understands <Text>{noFucksFor}</Text>. well i am not and i don't
					understand it. I only know to download and install applications. SO
					WHY THE FUCK IS THERE <Text>{noFucksFor}</Text>? STUPID FUCKING SMELLY
					NERDS
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
