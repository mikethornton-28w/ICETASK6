import React, { useState, useMemo, useEffect } from "react";
import { Text, View, Image,
  TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import  {LinearGradient}  from 'expo-linear-gradient';
import Slider from "@react-native-community/slider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

import musicTime from './assets/Night Walk.jpeg';

type GenreKey = "lofi" | "edm" | "jazz";

interface GenreStyle {
  background: string[];
  accent: string;
  text: string;
  buttonShape: number;
}


const GENRE_STYLES: Record<GenreKey, GenreStyle> = {
  lofi: {
    background: ["#1E1B2E"],
    accent: "#CBA4D4",
    text: "#EAE6F2",
    buttonShape: 20,
  },
  edm: {
    background: ["#000000"],
    accent: "#FF33AC",
    text: "#FFFFFF",
    buttonShape: 8,
  },
  jazz: {
    background: ["#2B2C28", "#6B4F3A"],
    accent: "#FFD580",
    text: "#FAE5D3",
    buttonShape: 12,
  },
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const duration = 240;

const genre: GenreKey = "lofi"; // change to "edm" or "jazz"
  const tokens = useMemo(() => GENRE_STYLES[genre], [genre]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setPosition((prev) => {
          if (prev < duration) {
            return prev + 1; // move 1 sec forward
          } else {
            setIsPlaying(false); // stop at end
            return prev;
          }
        });
      }, 1000); // update every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={tokens.background} style={styles.background}
      >


       {/* Album Art */}
      <View style={styles.albumWrapper}>
        <Image
          source={musicTime}
          style={[styles.albumArt, { borderRadius: tokens.buttonShape }]}
        />
      </View>

      {/* Title + Artist */}
      <Text style={[styles.title, { color: tokens.text }]}>Night Walk</Text>
      <Text style={[styles.artist, { color: tokens.text }]}>Lo-Fi Beats</Text>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={40} color={tokens.accent} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={70}
            color={tokens.accent}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={40} color={tokens.accent} />
        </TouchableOpacity>

        </View>

        {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Slider
          style={{ width: SCREEN_WIDTH - 60, height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={setPosition}
          minimumTrackTintColor={tokens.accent}
          maximumTrackTintColor={tokens.text + "44"}
          thumbTintColor={tokens.accent}
        />
      </View>

       {/* Optional Buttons */}
      <View style={styles.extraControls}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color={tokens.accent} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="shuffle" size={28} color={tokens.accent} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="repeat" size={28} color={tokens.accent} />
        </TouchableOpacity>
      </View>  

      </LinearGradient> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 2,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background:{
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  albumWrapper:{
    alignItems: "center",
    marginTop: 60,
  },
  albumArt:{
    width: 280,
    height: 280,
  },
  controls:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 40,
  },
  extraControls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 25,
    paddingHorizontal: 80,
  },
  progressContainer: {
    alignItems: "center",
    marginTop: 10,
  }
});
