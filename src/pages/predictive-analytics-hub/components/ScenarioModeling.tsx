import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { ScenarioParameter } from '../types';

interface ScenarioModelingProps {
  initialParameters: ScenarioParameter[];
  onApplyScenario: (parameters: ScenarioParameter[]) => void;
  className?: string;
}

const ScenarioModeling = ({
  initialParameters,
  onApplyScenario,
  className = '',
}: ScenarioModelingProps) => {
  const [parameters, setParameters] = useState<ScenarioParameter[]>(initialParameters || []);
  const [isModified, setIsModified] = useState(false);

  const handleParameterChange = (id: string, value: number) => {
    setParameters((prev) =>
      prev.map((param) =>
        param.id === id ? { ...param, adjustedValue: value } : param
      )
    );
    setIsModified(true);
  };

  const handleReset = () => {
    setParameters(
      (initialParameters || []).map((param) => ({
        ...param,
        adjustedValue: param.currentValue,
      }))
    );
    setIsModified(false);
  };

  const handleApply = () => {
    onApplyScenario(parameters);
    setIsModified(false);
  };

  const calculateTotalImpact = () => {
    return parameters.reduce((sum, param) => sum + param.impact, 0);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Icon name="Settings" size={20} className="text-primary" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Modélisation de Scénarios
          </h3>
          <p className="text-sm text-muted-foreground">
            Ajustez les paramètres pour simuler différents scénarios
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {parameters?.map((param) => {
          const variance =
            ((param.adjustedValue - param.currentValue) / param.currentValue) * 100;
          return (
            <div key={param.id} className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">
                  {param.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  Impact: {param.impact > 0 ? '+' : ''}
                  {param.impact.toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={param.adjustedValue}
                  onChange={(e) =>
                    handleParameterChange(param.id, parseFloat(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[60px]">
                  {param.unit}
                </span>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted-foreground">
                  Valeur actuelle: {param.currentValue} {param.unit}
                </span>
                {variance !== 0 && (
                  <span
                    className={
                      variance > 0 ? 'text-error' : 'text-success'
                    }
                  >
                    {variance > 0 ? '+' : ''}
                    {variance.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-lg bg-primary/10 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Impact total estimé
          </span>
          <span
            className={`text-lg font-semibold ${
              calculateTotalImpact() > 0 ? 'text-error' : 'text-success'
            }`}
          >
            {calculateTotalImpact() > 0 ? '+' : ''}
            {calculateTotalImpact().toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!isModified}
          iconName="RotateCcw"
          iconPosition="left"
          className="flex-1"
        >
          Réinitialiser
        </Button>
        <Button
          variant="default"
          onClick={handleApply}
          disabled={!isModified}
          iconName="Play"
          iconPosition="left"
          className="flex-1"
        >
          Appliquer
        </Button>
      </div>
    </div>
  );
};

export default ScenarioModeling;