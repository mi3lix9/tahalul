import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { DEFAULT_RESPONSE_AR, DEFAULT_RESPONSE_EN, findTipByKeywords } from '@/features/assistant/data/tips';
import { useI18n } from '@/providers/i18n-provider';

type Message = { role: 'user' | 'assistant'; text: string };

export function AssistantChat() {
  const { locale, t, isRtl } = useI18n();
  const suggestions = useMemo(() => [t('assistant.suggestion1'), t('assistant.suggestion2'), t('assistant.suggestion3')], [t]);
  const greeting = locale === 'ar' ? DEFAULT_RESPONSE_AR : DEFAULT_RESPONSE_EN;
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: greeting }]);
  const [input, setInput] = useState('');

  const sendMessage = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const tip = findTipByKeywords(value);
    const reply = tip ? (locale === 'ar' ? tip.responseAr : tip.responseEn) : locale === 'ar' ? DEFAULT_RESPONSE_AR : DEFAULT_RESPONSE_EN;
    setMessages((prev) => [...prev, { role: 'user', text: value }, { role: 'assistant', text: reply }]);
    setInput('');
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 16 }}>
        {messages.map((message, index) => (
          <View key={`${message.role}-${index}`} className={`mb-3 max-w-[85%] rounded-3xl px-4 py-3 ${message.role === 'assistant' ? 'self-start bg-white/8' : 'self-end bg-emerald-500'}`}>
            <Text className={`text-base ${message.role === 'assistant' ? 'text-foreground' : 'text-white'}`} style={{ writingDirection: isRtl ? 'rtl' : 'ltr' }}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="mb-3 flex-row flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Pressable key={suggestion} className="rounded-full border border-white/10 bg-white/5 px-3 py-2" onPress={() => sendMessage(suggestion)}>
            <Text className="text-sm text-foreground">{suggestion}</Text>
          </Pressable>
        ))}
      </View>

      <View className="mb-4 flex-row items-center gap-3 rounded-3xl border border-white/10 bg-card px-3 py-2">
        <TextInput
          className="flex-1 px-2 py-3 text-base text-foreground"
          placeholder={t('assistant.placeholder')}
          placeholderTextColor="#94a3b8"
          value={input}
          onChangeText={setInput}
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        />
        <Pressable className="rounded-2xl bg-emerald-500 px-4 py-3" onPress={() => sendMessage(input)}>
          <Text className="font-semibold text-white">{t('common.done')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
