// // app/_layout.tsx
// import { Stack } from 'expo-router';

// export default function Layout() {
//   return (
//     <Stack>
//       <Stack.Screen 
//         name="(auth)/login" 
//         options={{ 
//           headerShown: false 
//         }} 
//       />
//          <Stack.Screen 
//         name="(tabs)/booking" 
//         options={{ 
//           headerShown: false 
//         }} 
//       />
//       <Stack.Screen 
//         name="(tabs)" 
//         options={{ 
//           headerShown: false 
//         }} 
//       />
//     </Stack>
//   );
// }

// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Giữ màn hình splash hiển thị cho đến khi font được tải xong
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Tải font
  const [loaded, error] = useFonts({
    // Thêm các font tùy chỉnh nếu cần
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Màn hình xác thực */}
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />

      {/* Màn hình chính */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}