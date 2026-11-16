import { permanentRedirect } from "next/navigation";
import { caseStudyPath, ragmateCaseStudy } from "../../../lib/case-studies";

// 案例研究只有一个家：/demo/ragmate。
// /projects/ragmate 曾作为同一篇的第二份渲染上线过，旧链接一律并回正版。
export default function RagMateProjectRedirect() {
  permanentRedirect(caseStudyPath(ragmateCaseStudy));
}
