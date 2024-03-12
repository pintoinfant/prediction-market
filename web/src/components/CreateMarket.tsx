import { contract } from "@/lib/consts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWriteContract } from "wagmi";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function CreateMarket() {
  const { data: hash, writeContract } = useWriteContract();
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const publicKey = [
    2, 3, 145, 254, 91, 106, 162, 199, 30, 91, 88, 236, 143, 220, 74, 47, 61,
    39, 177, 111, 32, 213, 65, 102, 220, 66, 112, 171, 36, 18, 116, 2, 104,
  ];

  const privateKey = [
    119, 62, 116, 77, 171, 17, 129, 205, 251, 171, 31, 29, 215, 237, 145, 137,
    45, 68, 55, 191, 239, 97, 213, 156, 184, 34, 165, 34, 100, 165, 166, 93,
  ];

  useEffect(() => {
    toast({
      title: "Transactions Success",
      description: `Tx Hash: ${hash}`,
    });
  }, []);

  return (
    <div className="grid w-full gap-2 mt-10">
      <h1 className="font-bold">1) Create Market</h1>
      <Textarea
        className="dark:bg-[#111111] bg-zinc-200 ring-1 ring-black"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your message here."
      />
      <Button
        onClick={() => {
          writeContract({
            address: contract.address as any,
            abi: contract.abi,
            functionName: "createMarket",
            args: [question],
          });
        }}
      >
        Create Market
      </Button>
    </div>
  );
}
