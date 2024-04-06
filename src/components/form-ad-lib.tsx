import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";

const DEFAULTS = {
	newTo: "Github",
	noFucksFor: "CODE",
	justWantTo: "download this stupid fucking application",
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

	const getNewTo = () => newTo ?? DEFAULTS.newTo;
	const getNoFucksFor = () => noFucksFor ?? DEFAULTS.noFucksFor;
	const getJustWantTo = () => justWantTo ?? DEFAULTS.justWantTo;

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
				className="mt-8 border-t grid gap-4 p-10 font-mono bg-muted text-lg"
				id="text-to-copy"
			>
				<p>
					{disableNewTo !== true && `I am new to ${getNewTo()} and `}I have lots
					to say
				</p>
				<p>
					I DONT GIVE A FUCK ABOUT THE FUCKING {getNoFucksFor()}! i just want to{" "}
					{getJustWantTo()}
				</p>
				<p>
					WHY IS THERE {getNoFucksFor()}??? MAKE A FUCKING SOLUTION AND GIVE IT
					TO ME. these dumbfucks think that everyone is a developer and
					understands {getNoFucksFor()}. well i am not and i don't understand
					it. I only know to download and install applications. SO WHY THE FUCK
					IS THERE {getNoFucksFor()}? STUPID FUCKING SMELLY NERDS
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
