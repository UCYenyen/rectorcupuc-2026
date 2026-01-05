import Link from "next/link";
import { Settings } from "lucide-react";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
export default function page() {
    return (
        <>
            <div className='w-screen h-[10vh] md:h-[7vh]'></div>
            <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col  items-center justify-center">
                <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
                <StripeBackground />
                <RectorInlineTitle />
                <div className="relative mb-48 z-2 flex flex-col gap-4 justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
                    <CompetitionTitleHeader title="Privacy Policy" shouldFitContent={true} />
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="bg-black/40 border-white border-3 rounded-full p-4">
                            <Settings className="w-16 h-16 text-white" />
                        </div>

                        {/* Scrollable policy content */}
                        <div className="w-full max-w-3xl max-h-[60vh] overflow-y-auto p-6 bg-[#00000020] rounded-lg custom-scrollbar space-y-4">
                            <p className="text-white text-lg leading-relaxed">
                                Rector Cup UC 2026 is a multi-category competition encompassing Sports, E-Sports, Arts, and Learnings. We are committed to protecting the privacy of our participants (students). This policy outlines how we collect, use, and safeguard your information when you use our platform.
                            </p>

                            <h3 className="text-white font-bold">1. Information We Collect</h3>
                            <p className="text-white">To facilitate competition registration and match management, we collect the following data:</p>
                            <ul className="list-disc list-inside text-white space-y-1">
                                <li><strong>Identity Information:</strong> Full name, Student Identification Number (NIM), and Faculty (e.g., SBM, SCI, SOT, SIFT, SOM, SOP, SOC).</li>
                                <li><strong>Authentication Data:</strong> We use Google OAuth for secure login (ciputra.ac.id email and profile image).</li>
                                <li><strong>Competition Data:</strong> Team names, referral codes, and role within a team (Leader or Member).</li>
                                <li><strong>Verification Assets:</strong> URLs for "Follow Proof" and profile images required for registration.</li>
                                <li><strong>Voting Data:</strong> Records of votes cast and received for specific competition categories.</li>
                            </ul>

                            <h3 className="text-white font-bold">2. How We Use Your Information</h3>
                            <ul className="list-disc list-inside text-white space-y-1">
                                <li><strong>Eligibility Verification:</strong> Ensure participants are active Ciputra University students via ciputra.ac.id emails.</li>
                                <li><strong>Competition Management:</strong> Organize matches and track scores.</li>
                            </ul>

                            <h3 className="text-white font-bold">3. Data Retention</h3>
                            <p className="text-white">Registration data and competition results are stored for the duration of Rector Cup 2026. Match history and winners may be archived for historical records by the Student Council.</p>

                            <h3 className="text-white font-bold">4. Your Rights</h3>
                            <ul className="list-disc list-inside text-white space-y-1">
                                <li>View registration status via the User Dashboard (Pending, Registered, Failed).</li>
                                <li>Update faculty or NIM if incorrectly entered during initial sync.</li>
                                <li>Withdraw from a competition to remove specific registration data from active match pools.</li>
                            </ul>

                            <h3 className="text-white font-bold">5. Contact Us</h3>
                            <p className="text-white">For questions or data deletion requests, contact us.</p>
                        </div>

                        <div className="text-2xl text-white bg-black/30 border-white border-3 rounded-lg px-4 py-2 text-center font-bold uppercase">
                            <Link href={"/"}>Go back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
