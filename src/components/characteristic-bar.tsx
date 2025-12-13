interface CharacteristicBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export function CharacteristicBar({
  label,
  value,
  maxValue = 5,
}: CharacteristicBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">
          {value}/{maxValue}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
    </div>
  );
}
