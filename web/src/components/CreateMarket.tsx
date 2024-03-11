import { contract } from "@/lib/consts";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWriteContract } from "wagmi";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function CreateMarket() {
  const { data: hash, writeContract } = useWriteContract();
  const { toast } = useToast();
  const [question, setQuestion] = useState("");

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
