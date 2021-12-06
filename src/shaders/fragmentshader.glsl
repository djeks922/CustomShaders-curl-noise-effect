uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vPosition;
void main(){
    
    vec4 color = texture2D(uTexture, vUv);

    float border = 0.7;
	float radius = 0.5;
	float dist = radius - distance(gl_PointCoord, vec2(0.5));
	float t = smoothstep(0.0, border, dist);
  
    vec4 colorFinal = color;
    colorFinal.a = t;
    gl_FragColor = colorFinal;
    if(color.r < 0.1 && color.b< 0.1 && color.g < 0.1) discard;
}