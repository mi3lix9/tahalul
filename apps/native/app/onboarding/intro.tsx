import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';

import { useI18n } from '@/providers/i18n-provider';

const { width } = Dimensions.get('window');

export default function IntroScreen() {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const slides = [
    { title: t('onboarding.slide1Title'), desc: t('onboarding.slide1Desc'), icon: '📸' },
    { title: t('onboarding.slide2Title'), desc: t('onboarding.slide2Desc'), icon: '🏙️' },
    { title: t('onboarding.slide3Title'), desc: t('onboarding.slide3Desc'), icon: '🏆' },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const next = currentSlide + 1;
      setCurrentSlide(next);
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
    } else {
      router.push('/onboarding/profile');
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const slide = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slide);
        }}
      >
        {slides.map((slide, i) => (
          <View key={i} style={{ width }} className="flex-1 items-center justify-center gap-6 px-8">
            <Text className="text-6xl">{slide.icon}</Text>
            <Text className="text-3xl font-bold text-center text-foreground">{slide.title}</Text>
            <Text className="text-center text-lg text-foreground/70">{slide.desc}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="gap-4 px-8 pb-12">
        <View className="flex-row justify-center gap-2">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full ${i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-default-300'}`}
            />
          ))}
        </View>
        <Pressable onPress={handleNext} className="items-center rounded-xl bg-primary px-8 py-4">
          <Text className="text-lg font-semibold text-primary-foreground">
            {currentSlide < slides.length - 1 ? t('common.next') : t('common.start')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
