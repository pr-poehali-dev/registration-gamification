import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const avatars = [
  { id: 1, emoji: "🚀", name: "Космонавт" },
  { id: 2, emoji: "⚡", name: "Молния" },
  { id: 3, emoji: "🎮", name: "Геймер" },
  { id: 4, emoji: "🎨", name: "Художник" },
  { id: 5, emoji: "🔥", name: "Огонь" },
  { id: 6, emoji: "💎", name: "Алмаз" },
];

const achievements = [
  { id: 1, title: "Первый шаг", description: "Начните регистрацию", icon: "Footprints", unlocked: true },
  { id: 2, title: "Креатор", description: "Выберите аватар", icon: "User", unlocked: false },
  { id: 3, title: "Мастер", description: "Заполните все поля", icon: "Award", unlocked: false },
  { id: 4, title: "Легенда", description: "Завершите регистрацию", icon: "Trophy", unlocked: false },
];

export default function Index() {
  const [step, setStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const progressPercent = (step / 3) * 100;

  const handleNext = () => {
    if (step === 1 && !formData.username) {
      toast.error("Введите имя пользователя");
      return;
    }
    if (step === 2 && !selectedAvatar) {
      toast.error("Выберите аватар");
      return;
    }
    if (step === 3 && (!formData.email || !formData.password)) {
      toast.error("Заполните все поля");
      return;
    }

    setXp((prev) => prev + 33);
    if (xp + 33 >= 100) {
      setLevel((prev) => prev + 1);
      setXp(0);
      toast.success(`Поздравляем! Вы достигли ${level + 1} уровня! 🎉`);
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      toast.success("Регистрация завершена! 🚀");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI0MCwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl w-full relative z-10">
        <div className="lg:col-span-2">
          <Card className="p-8 bg-card/80 backdrop-blur-xl border-2 border-neon-cyan/30 shadow-2xl shadow-neon-cyan/20 animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
                  Регистрация
                </h1>
                <Badge variant="outline" className="border-neon-purple text-neon-purple animate-glow-pulse">
                  Уровень {level}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс регистрации</span>
                  <span className="text-neon-cyan font-semibold">{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-3 bg-muted" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span className={step >= 1 ? "text-neon-cyan" : ""}>Шаг 1</span>
                  <span className={step >= 2 ? "text-neon-cyan" : ""}>Шаг 2</span>
                  <span className={step >= 3 ? "text-neon-cyan" : ""}>Шаг 3</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-scale-in">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-foreground">
                      Имя пользователя
                    </Label>
                    <Input
                      id="username"
                      placeholder="Введите ваше имя"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="mt-2 border-neon-cyan/50 focus:border-neon-cyan bg-input/50"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Создайте уникальное имя для вашего профиля
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Label className="text-foreground">Выберите аватар</Label>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedAvatar === avatar.id
                            ? "border-neon-magenta bg-neon-magenta/10 shadow-lg shadow-neon-magenta/50"
                            : "border-muted hover:border-neon-cyan bg-card/50"
                        }`}
                      >
                        <div className="text-5xl mb-2">{avatar.emoji}</div>
                        <div className="text-sm font-medium text-foreground">{avatar.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 border-neon-cyan/50 focus:border-neon-cyan bg-input/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-foreground">
                      Пароль
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="mt-2 border-neon-cyan/50 focus:border-neon-cyan bg-input/50"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                  >
                    <Icon name="ChevronLeft" className="mr-2" size={20} />
                    Назад
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-magenta hover:opacity-90 text-white border-0 shadow-lg shadow-neon-cyan/30"
                >
                  {step === 3 ? "Завершить" : "Далее"}
                  <Icon name="ChevronRight" className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-card/80 backdrop-blur-xl border-2 border-neon-purple/30 shadow-xl shadow-neon-purple/10 animate-slide-in-right">
            <h3 className="text-xl font-bold text-neon-purple mb-4 flex items-center gap-2">
              <Icon name="Award" size={24} />
              Достижения
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    achievement.unlocked || (achievement.id === 1 && step >= 1) || (achievement.id === 2 && selectedAvatar) || (achievement.id === 3 && step === 3)
                      ? "border-neon-cyan bg-neon-cyan/5 shadow-md shadow-neon-cyan/20"
                      : "border-muted bg-muted/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      name={achievement.icon as any}
                      size={24}
                      className={achievement.unlocked || (achievement.id === 1 && step >= 1) || (achievement.id === 2 && selectedAvatar) ? "text-neon-cyan" : "text-muted-foreground"}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-xl border-2 border-neon-blue/30 shadow-xl shadow-neon-blue/10 animate-slide-in-right animation-delay-200">
            <h3 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
              <Icon name="TrendingUp" size={24} />
              Рейтинг
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Опыт (XP)</span>
                <span className="text-2xl font-bold text-neon-cyan">{xp}/100</span>
              </div>
              <Progress value={xp} className="h-2 bg-muted" />
              <div className="text-center text-sm text-muted-foreground">
                Продолжайте регистрацию, чтобы получить больше XP!
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
