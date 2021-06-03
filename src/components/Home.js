import * as THREE from "three";
import React, {
  useRef,
  useEffect,
  useState,
  Suspense,
  useCallback,
} from "react";


import Light from './components/RectLight'
//R3F
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";
