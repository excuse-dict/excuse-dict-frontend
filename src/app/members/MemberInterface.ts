export type MemberRank = "TADPOLE" | "LOACH" | "SNAKE";

export interface MemberInterface{
    id: number,
    nickname: string,
    rank: MemberRank,
}