import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";

interface RankToggleProps {
  isTrueRanksOn: boolean;
  handleTrueToggle: () => void;
}

export default function RankToggle(props: RankToggleProps) {
  return (
    <div className="flex justify-end items-center gap-2 bg-transparent text-slate-100 mb-5">
      <Label
        className="text-slate-500 text-md cursor-pointer"
        htmlFor="rankToggle"
      >
        {!props.isTrueRanksOn ? 'Currently using Manual Ranking' : 'Currently using True Ranking'}
      </Label>
      <Switch
        id="rankToggle"
        checked={props.isTrueRanksOn}
        onCheckedChange={props.handleTrueToggle}
      />
    </div>
  );
}
