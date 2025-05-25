import z from "zod";

// No request body schemas needed for Kakao client service as all endpoints are GET requests.
// This file is created to maintain consistency with other services and can be used
// if the API evolves to include POST/PUT requests with bodies.

export const KakaoLoginQuerySchema = z.object({}); // Empty schema for GET request

export const KakaoCallbackQuerySchema = z.object({
  code: z.string(),
  state: z.string(),
  error: z.string().optional(),
});

export const KakaoInfoQuerySchema = z.object({}); // Empty schema for GET request

export type KakaoLoginQuerySchemaType = z.infer<typeof KakaoLoginQuerySchema>;
export type KakaoCallbackQuerySchemaType = z.infer<
  typeof KakaoCallbackQuerySchema
>;
export type KakaoInfoQuerySchemaType = z.infer<typeof KakaoInfoQuerySchema>;
