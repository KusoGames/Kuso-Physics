"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "ja"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Game UI
    "app.title": "Kuso Physics",
    "game.start": "Start",
    "game.reset": "Reset",
    "game.level": "Level",
    "game.prevLevel": "Previous Level",
    "game.nextLevel": "Next Level",
    "game.shakeMode": "Shake Mode",
    "game.shakeDetected": "Shake detected!",
    "game.shakeInstructions": "Shake screen to move the ball",
    "game.cleared": "Cleared!",
    "game.congratulations": "Congratulations!",
    "game.timeUp": "Time's Up!",
    "game.tryAgain": "Try again",
    "game.share": "Share",
    "game.shareCleared": "Share your achievement",

    // Difficulty levels
    "difficulty.beginner": "Beginner",
    "difficulty.intermediate": "Intermediate",
    "difficulty.advanced": "Advanced",
    "difficulty.expert": "Expert",
    "difficulty.master": "Master",
    "difficulty.level": "Difficulty:",

    // Navigation
    "nav.playCustomLevel": "Play Custom Levels",
    "nav.openLevelEditor": "Open Level Editor",
    "nav.back": "Back",
    "nav.articles": "Physics Articles",

    // Level Editor
    "editor.title": "Level Editor",
    "editor.levelName": "Level Name",
    "editor.authorName": "Author Name",
    "editor.save": "Save",
    "editor.export": "Export",
    "editor.import": "Import",
    "editor.testPlay": "Test Play",
    "editor.stop": "Stop",
    "editor.tools": "Tools",
    "editor.properties": "Properties",
    "editor.drawingTools": "Drawing Tools",
    "editor.line": "Line",
    "editor.startPoint": "Start Point",
    "editor.endPoint": "End Point",
    "editor.select": "Select",
    "editor.erase": "Erase",
    "editor.edit": "Edit",
    "editor.undo": "Undo",
    "editor.redo": "Redo",
    "editor.frameSize": "Frame Size",
    "editor.wideFrame": "Wide Frame",
    "editor.timeLimit": "Time Limit",
    "editor.seconds": "seconds",
    "editor.noTimeLimit": "0 = No time limit",
    "editor.lineProperties": "Line Properties",
    "editor.friction": "Friction:",
    "editor.bounce": "Bounce",
    "editor.color": "Color",
    "editor.apply": "Apply",
    "editor.selectLine": "Select a line",
    "editor.selectLineHelp": "Use the 'Select' tool to click on a line to edit its properties",
    "editor.saveWarning": "Created levels are not saved automatically. Press the 'Save' button to save.",

    // Custom Levels
    "custom.title": "Custom Levels",
    "custom.create": "Create New",
    "custom.search": "Search by level name or author...",
    "custom.noLevels": "No custom levels found",
    "custom.noSearchResults": "No levels match your search criteria",
    "custom.createFirst": "Create your first level",
    "custom.author": "Author:",
    "custom.timeLimit": "Time Limit:",
    "custom.noTimeLimit": "No time limit",
    "custom.createdDate": "Created:",
    "custom.export": "Export",
    "custom.edit": "Edit",
    "custom.delete": "Delete",
    "custom.play": "Play",
    "custom.deleteConfirm": "Delete Level",
    "custom.deleteWarning": "Are you sure you want to delete level '{name}'? This action cannot be undone.",
    "custom.cancel": "Cancel",
    "custom.shareLevel": "Share Level",
    "custom.shareLevelText": "Share custom level '{name}' on social media!",

    // Share
    "share.title": "Share Game",
    "share.levelTitle": "Try '{name}' - Physics Puzzle Game",
    "share.levelDescription": "Try level '{name}' by {author}! Physics Puzzle Game",
    "share.clearedTitle": "I cleared '{name}'! - Physics Puzzle Game",
    "share.clearedDescription": "I cleared level '{name}' by {author}! Can you do it too?",
    "share.copyLink": "Copy Link",
    "share.copied": "Copied",

    // Alerts
    "alert.motionPermission": "Device motion access is not permitted. Please allow it in settings.",
    "alert.saveSuccess": "Saved",
    "alert.saveSuccessDetail": "Level '{name}' has been saved",
    "alert.saveError": "Save Error",
    "alert.saveErrorDetail": "Failed to save the level",
    "alert.exportSuccess": "Export Complete",
    "alert.exportSuccessDetail": "Level '{name}' has been exported",
    "alert.importError": "Import Error",
    "alert.importErrorDetail": "Invalid level file",
    "alert.importSuccess": "Import Complete",
    "alert.importSuccessDetail": "Level '{name}' has been imported",
    "alert.deleteSuccess": "Delete Complete",
    "alert.deleteSuccessDetail": "Level '{name}' has been deleted",
    "alert.deleteError": "Delete Error",
    "alert.deleteErrorDetail": "Failed to delete the level",
    "alert.copySuccess": "Link Copied",
    "alert.copySuccessDetail": "Link has been copied to clipboard",
    "alert.copyError": "Copy Failed",
    "alert.copyErrorDetail": "Failed to copy the link",
    "alert.shareNotSupported": "Share Not Supported",
    "alert.shareNotSupportedDetail": "Your browser does not support native sharing",

    // Footer
    "footer.copyright": "© {year} KusoGames. All rights reserved.",

    // Language
    "language.switch": "Language",
    "language.en": "English",
    "language.ja": "日本語",

    // Articles
    "articles.title": "Physics Articles",
    "articles.description": "Learn about the physics concepts behind the game",
    "articles.readMore": "Read More",
    "articles.backToList": "Back to Articles",
    "articles.backToGame": "Back to Game",

    // Article titles
    "article.newtonLaws.title": "Newton's Laws of Motion",
    "article.newtonLaws.description": "The fundamental principles governing the motion of objects",
    "article.gravity.title": "Gravity and Projectile Motion",
    "article.gravity.description": "How objects move under the influence of gravity",
    "article.friction.title": "Friction and Collisions",
    "article.friction.description": "Understanding surface interactions and energy transfer",
    "article.energy.title": "Conservation of Energy",
    "article.energy.description": "The principle that energy cannot be created or destroyed",
    "article.harmonic.title": "Simple Harmonic Motion",
    "article.harmonic.description": "The physics of oscillations and bouncing objects",

    // Legal
    "legal.privacyPolicy": "Privacy Policy",
    "legal.disclaimer": "Disclaimer",
    "legal.streamingPolicy": "Streaming Policy",
    "legal.contact": "Contact",
    "legal.lastUpdated": "Last Updated: May 13, 2025",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.introduction":
      "This Privacy Policy describes how your personal information is collected, used, and shared when you use Kuso Physics.",
    "privacy.whatWeCollect": "Information We Collect",
    "privacy.whatWeCollectText": "We collect minimal information to provide and improve our service. This includes:",
    "privacy.localStorage":
      "Local Storage Data: We store your game progress, custom levels, and preferences locally on your device using browser storage.",
    "privacy.noPersonalData":
      "Personal Data: We do not collect personal information such as names, email addresses, or payment information.",
    "privacy.analytics": "Analytics: We may use anonymous analytics to understand how users interact with our game.",
    "privacy.howWeUse": "How We Use Your Information",
    "privacy.howWeUseText": "We use the information we collect to:",
    "privacy.provideService": "Provide and maintain our service",
    "privacy.improveService": "Improve and optimize our game",
    "privacy.dataSharing": "Sharing Your Information",
    "privacy.dataSharingText":
      "We do not sell or share your data with third parties except as described in this policy.",
    "privacy.serviceProviders":
      "Service Providers: We may share information with third-party vendors who provide services on our behalf (e.g., hosting providers).",
    "privacy.legalRequirements": "Legal Requirements: We may disclose information if required by law.",
    "privacy.dataRetention": "Data Retention",
    "privacy.dataRetentionText":
      "Local storage data remains on your device until you clear your browser data or uninstall the application.",
    "privacy.userRights": "Your Rights",
    "privacy.userRightsText": "You have the right to:",
    "privacy.accessData": "Access the data we have about you",
    "privacy.deleteData": "Delete your data by clearing your browser's local storage",
    "privacy.changes": "Changes to This Privacy Policy",
    "privacy.changesText":
      "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.",
    "privacy.contact": "Contact Us",
    "privacy.contactText":
      "If you have questions about this Privacy Policy, please contact us through our GitHub repository.",

    // Disclaimer
    "disclaimer.title": "Disclaimer",
    "disclaimer.general": "General Disclaimer",
    "disclaimer.generalText":
      "Kuso Physics is provided 'as is' without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
    "disclaimer.liability": "Limitation of Liability",
    "disclaimer.liabilityText":
      "In no event shall the developers of Kuso Physics be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the game.",
    "disclaimer.accuracy": "Accuracy of Information",
    "disclaimer.accuracyText":
      "While we strive to provide accurate physics simulations for educational purposes, the physics in Kuso Physics are simplified for gameplay and may not perfectly represent real-world physics in all cases.",
    "disclaimer.externalLinks": "External Links",
    "disclaimer.externalLinksText":
      "Kuso Physics may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.",
    "disclaimer.userContent": "User-Generated Content",
    "disclaimer.userContentText":
      "Users can create and share custom levels. We are not responsible for user-generated content and cannot guarantee its quality, safety, or legality.",

    // Streaming Policy
    "streaming.title": "Game Streaming Policy",
    "streaming.introduction":
      "We encourage sharing your Kuso Physics gameplay experience with others through streaming, videos, and other content creation.",
    "streaming.permission": "General Permission",
    "streaming.permissionText":
      "You are free to create and share content featuring Kuso Physics on platforms such as YouTube, Twitch, Niconico, and social media without prior permission, subject to the guidelines below.",
    "streaming.monetization": "Monetization",
    "streaming.monetizationText": "You may monetize your content through:",
    "streaming.ads": "Platform advertising programs (e.g., YouTube Partner Program, Twitch Affiliate/Partner)",
    "streaming.donations": "Viewer donations and subscriptions",
    "streaming.sponsorships": "Channel sponsorships (as long as they don't imply official endorsement)",
    "streaming.restrictions": "Restrictions",
    "streaming.restrictionsText": "The following activities require prior written permission:",
    "streaming.commercialUse":
      "Commercial use beyond standard content monetization (e.g., using game footage in advertisements)",
    "streaming.paidContent": "Selling content that primarily consists of Kuso Physics gameplay",
    "streaming.misrepresentation": "Representing yourself as an official representative of Kuso Physics",
    "streaming.attribution": "Attribution",
    "streaming.attributionText": "Please include the following in your content description:",
    "streaming.attributionExample": "Kuso Physics is developed by KusoGames. https://github.com/KusoGames/Kuso-Physics",
    "streaming.contentGuidelines": "Content Guidelines",
    "streaming.contentGuidelinesText": "Please ensure your content:",
    "streaming.appropriate": "Is appropriate for general audiences",
    "streaming.noHate": "Does not promote hate speech, discrimination, or harmful activities",
    "streaming.noMisleading": "Does not mislead viewers about the game's features or functionality",
    "streaming.contactUs": "Contact Us",
    "streaming.contactUsText":
      "If you have questions about this streaming policy or need permission for restricted uses, please contact us through our GitHub repository.",

    // Contact
    "contact.title": "Contact Us",
    "contact.text": "Have questions, feedback, or found a bug? We'd love to hear from you!",
    "contact.github": "GitHub Repository",
    "contact.githubText":
      "The best way to reach us is through our GitHub repository. You can report issues, suggest features, or contribute to the project.",
    "contact.githubLink": "Visit our GitHub Repository",
    "contact.issues": "Reporting Issues",
    "contact.issuesText":
      "If you've found a bug or have a technical issue, please create a new issue on GitHub with the following information:",
    "contact.issueSteps": "Steps to reproduce the issue",
    "contact.issueBehavior": "What you expected to happen vs. what actually happened",
    "contact.issueSystem": "Your system information (browser, device, OS)",
    "contact.feature": "Feature Requests",
    "contact.featureText":
      "Have an idea to make Kuso Physics better? We welcome your suggestions! Please describe your idea in detail on GitHub.",

    // Help Page
    "help.title": "What is Kuso Physics?",
    "help.subtitle": "Overview and How to Play",
    "help.introduction":
      "Welcome to Kuso Physics, a physics-based puzzle game where you guide a ball to its destination by manipulating the environment and using the laws of physics.",

    // Game Overview Section
    "help.overview.title": "Game Overview",
    "help.overview.description":
      "Kuso Physics is a challenging puzzle game that combines fun gameplay with real physics concepts. Your goal is to guide a ball from its starting position to the target destination by using gravity, momentum, friction, and other physics principles.",
    "help.overview.features": "Key Features:",
    "help.overview.feature1": "Physics-based puzzles with realistic ball movement",
    "help.overview.feature2": "Multiple difficulty levels from beginner to expert",
    "help.overview.feature3": "Custom level editor to create your own challenges",
    "help.overview.feature4": "Educational articles about physics concepts",
    "help.overview.feature5": "Share and play levels created by other players",

    // How to Play Section
    "help.howToPlay.title": "How to Play",
    "help.howToPlay.description": "The gameplay is simple to understand but challenging to master:",
    "help.howToPlay.step1.title": "1. Start the Ball",
    "help.howToPlay.step1.description": "Press the Start button to begin the simulation and set the ball in motion.",
    "help.howToPlay.step2.title": "2. Guide the Ball",
    "help.howToPlay.step2.description":
      "Use Shake Mode to influence the ball's movement by shaking your device (on mobile) or moving your mouse (on desktop).",
    "help.howToPlay.step3.title": "3. Reach the Target",
    "help.howToPlay.step3.description": "Guide the ball to the red target ring to complete the level.",
    "help.howToPlay.step4.title": "4. Reset if Needed",
    "help.howToPlay.step4.description": "If the ball gets stuck or falls off the course, press Reset to try again.",

    // Controls Section
    "help.controls.title": "Controls",
    "help.controls.description": "Kuso Physics offers intuitive controls for both mobile and desktop users:",
    "help.controls.mobile.title": "Mobile Controls:",
    "help.controls.mobile.shake": "Shake your device to apply force to the ball",
    "help.controls.mobile.touch": "Touch buttons for Start, Reset, and navigation",
    "help.controls.mobile.pinch": "Pinch to zoom and rotate the view (where supported)",
    "help.controls.desktop.title": "Desktop Controls:",
    "help.controls.desktop.mouse": "Move your mouse rapidly to apply force to the ball (in Shake Mode)",
    "help.controls.desktop.buttons": "Click buttons for Start, Reset, and navigation",
    "help.controls.desktop.orbit": "Click and drag to rotate the view, scroll to zoom",

    // Game Modes Section
    "help.modes.title": "Game Modes",
    "help.modes.campaign.title": "Campaign Mode",
    "help.modes.campaign.description":
      "Progress through increasingly difficult pre-designed levels that introduce new physics concepts.",
    "help.modes.custom.title": "Custom Levels",
    "help.modes.custom.description": "Play levels created by other users or create your own using the Level Editor.",
    "help.modes.editor.title": "Level Editor",
    "help.modes.editor.description":
      "Design your own physics puzzles with the built-in editor. Place platforms, set bounce and friction properties, define start and end points, and share your creation with others.",

    // Tips and Tricks Section
    "help.tips.title": "Tips and Tricks",
    "help.tips.intro": "Here are some helpful tips to improve your gameplay:",
    "help.tips.tip1.title": "Use Momentum",
    "help.tips.tip1.description": "Let the ball build up speed on downward slopes to help it climb upward sections.",
    "help.tips.tip2.title": "Understand Bounce Properties",
    "help.tips.tip2.description":
      "Pink/purple platforms have higher bounce properties than green ones. Use them to reach higher areas.",
    "help.tips.tip3.title": "Control Your Force",
    "help.tips.tip3.description":
      "Apply gentle forces when the ball needs precise guidance. Too much force can send it off course.",
    "help.tips.tip4.title": "Study the Layout",
    "help.tips.tip4.description": "Before starting, take a moment to analyze the level and plan your approach.",
    "help.tips.tip5.title": "Learn from Physics Articles",
    "help.tips.tip5.description":
      "Read the in-game physics articles to better understand the principles that govern the game mechanics.",

    // FAQ Section
    "help.faq.title": "Frequently Asked Questions",
    "help.faq.q1": "Why isn't Shake Mode working on my device?",
    "help.faq.a1":
      "For mobile devices, you need to grant motion sensor permissions. Check your browser settings to ensure these permissions are enabled.",
    "help.faq.q2": "How do I save my custom level?",
    "help.faq.a2":
      "In the Level Editor, click the Save button after designing your level. Custom levels are stored in your browser's local storage.",
    "help.faq.q3": "Can I play Kuso Physics offline?",
    "help.faq.a3":
      "Yes! Once loaded, the game can be played offline. It's also installable as a Progressive Web App (PWA) on supported devices.",
    "help.faq.q4": "How do I share my custom level with friends?",
    "help.faq.a4":
      "After saving your level, you can export it as a JSON file using the Export button. Your friends can then import this file in their game.",
    "help.faq.q5": "Why does the ball sometimes get stuck?",
    "help.faq.a5":
      "This can happen due to physics simulation limitations or level design. Try applying a small force to dislodge it or reset the level if needed.",

    // Navigation
    "nav.help": "Help",
  },
  ja: {
    // Game UI
    "app.title": "Kuso Physics",
    "game.start": "スタート",
    "game.reset": "リセット",
    "game.level": "レベル",
    "game.prevLevel": "前のレベル",
    "game.nextLevel": "次のレベル",
    "game.shakeMode": "シェイクモード",
    "game.shakeDetected": "シェイク検出中！",
    "game.shakeInstructions": "画面を振るとボールが動きます",
    "game.cleared": "クリア！",
    "game.congratulations": "おめでとうございます！",
    "game.timeUp": "タイムアップ！",
    "game.tryAgain": "もう一度挑戦しましょう",
    "game.share": "シェア",
    "game.shareCleared": "クリアをシェア",

    // Difficulty levels
    "difficulty.beginner": "初級",
    "difficulty.intermediate": "中級",
    "difficulty.advanced": "上級",
    "difficulty.expert": "超上級",
    "difficulty.master": "超超上級",
    "difficulty.level": "難易度:",

    // Navigation
    "nav.playCustomLevel": "カスタムレベルをプレイ",
    "nav.openLevelEditor": "レベルエディタを開く",
    "nav.back": "戻る",
    "nav.articles": "物理学の記事",

    // Level Editor
    "editor.title": "レベルエディタ",
    "editor.levelName": "レベル名",
    "editor.authorName": "作者名",
    "editor.save": "保存",
    "editor.export": "エクスポート",
    "editor.import": "インポート",
    "editor.testPlay": "テストプレイ",
    "editor.stop": "停止",
    "editor.tools": "ツール",
    "editor.properties": "プロパティ",
    "editor.drawingTools": "描画ツール",
    "editor.line": "線",
    "editor.startPoint": "開始点",
    "editor.endPoint": "終了点",
    "editor.select": "選択",
    "editor.erase": "消去",
    "editor.edit": "編集",
    "editor.undo": "元に戻す",
    "editor.redo": "やり直し",
    "editor.frameSize": "フレームサイズ",
    "editor.wideFrame": "広いフレーム",
    "editor.timeLimit": "制限時間",
    "editor.seconds": "秒",
    "editor.noTimeLimit": "0 = 制限時間なし",
    "editor.lineProperties": "線のプロパティ",
    "editor.friction": "摩擦係数:",
    "editor.bounce": "バウンス",
    "editor.color": "色",
    "editor.apply": "適用",
    "editor.selectLine": "線を選択してください",
    "editor.selectLineHelp": "「選択」ツールを使用して線をクリックすると、プロパティを編集できます",
    "editor.saveWarning": "作成したレベルは自動的に保存されません。「保存」ボタンを押して保存してください。",

    // Custom Levels
    "custom.title": "カスタムレベル",
    "custom.create": "新規作成",
    "custom.search": "レベル名または作者名で検索...",
    "custom.noLevels": "カスタムレベルがありません",
    "custom.noSearchResults": "検索条件に一致するレベルが見つかりませんでした",
    "custom.createFirst": "最初のレベルを作成",
    "custom.author": "作者:",
    "custom.timeLimit": "制限時間:",
    "custom.noTimeLimit": "制限時間なし",
    "custom.createdDate": "作成日:",
    "custom.export": "エクスポート",
    "custom.edit": "編集",
    "custom.delete": "削除",
    "custom.play": "プレイ",
    "custom.deleteConfirm": "レベルを削除",
    "custom.deleteWarning": "レベル「{name}」を削除しますか？この操作は元に戻せません。",
    "custom.cancel": "キャンセル",
    "custom.shareLevel": "レベルをシェア",
    "custom.shareLevelText": "カスタムレベル「{name}」をSNSでシェアしましょう！",

    // Share
    "share.title": "ゲームをシェア",
    "share.levelTitle": "「{name}」に挑戦しよう！ - 物理パズルゲーム",
    "share.levelDescription": "作者: {author} のレベル「{name}」に挑戦しよう！物理パズルゲーム",
    "share.clearedTitle": "「{name}」をクリアしました！ - 物理パズルゲーム",
    "share.clearedDescription": "作者: {author} のレベル「{name}」をクリアしました！あなたも挑戦してみませんか？",
    "share.copyLink": "リンクをコピー",
    "share.copied": "コピー済み",

    // Alerts
    "alert.motionPermission": "デバイスの動きへのアクセスが許可されていません。設定から許可してください。",
    "alert.saveSuccess": "保存完了",
    "alert.saveSuccessDetail": "レベル「{name}」が保存されました",
    "alert.saveError": "保存エラー",
    "alert.saveErrorDetail": "レベルの保存に失敗しました",
    "alert.exportSuccess": "エクスポート完了",
    "alert.exportSuccessDetail": "レベル「{name}」がエクスポートされました",
    "alert.importError": "インポートエラー",
    "alert.importErrorDetail": "無効なレベルファイルです",
    "alert.importSuccess": "インポート完了",
    "alert.importSuccessDetail": "レベル「{name}」がインポートされました",
    "alert.deleteSuccess": "削除完了",
    "alert.deleteSuccessDetail": "レベル「{name}」が削除されました",
    "alert.deleteError": "削除エラー",
    "alert.deleteErrorDetail": "レベルの削除に失敗しました",
    "alert.copySuccess": "リンクをコピーしました",
    "alert.copySuccessDetail": "クリップボードにリンクがコピーされました",
    "alert.copyError": "コピーに失敗しました",
    "alert.copyErrorDetail": "リンクのコピーに失敗しました",
    "alert.shareNotSupported": "シェア機能がサポートされていません",
    "alert.shareNotSupportedDetail": "お使いのブラウザはネイティブシェア機能をサポートしていません",

    // Footer
    "footer.copyright": "© {year} KusoGames. All rights reserved.",

    // Language
    "language.switch": "言語",
    "language.en": "English",
    "language.ja": "日本語",

    // Articles
    "articles.title": "物理学の記事",
    "articles.description": "ゲームの背後にある物理学の概念について学ぶ",
    "articles.readMore": "続きを読む",
    "articles.backToList": "記事一覧に戻る",
    "articles.backToGame": "ゲームに戻る",

    // Article titles
    "article.newtonLaws.title": "ニュートンの運動法則",
    "article.newtonLaws.description": "物体の動きを支配する基本原理",
    "article.gravity.title": "重力と放物運動",
    "article.gravity.description": "重力の影響下での物体の動き",
    "article.friction.title": "摩擦と衝突",
    "article.friction.description": "表面相互作用とエネルギー伝達の理解",
    "article.energy.title": "エネルギー保存則",
    "article.energy.description": "エネルギーは創造も破壊もできないという原理",
    "article.harmonic.title": "単振動",
    "article.harmonic.description": "振動とバウンスする物体の物理学",

    // Legal
    "legal.privacyPolicy": "プライバシーポリシー",
    "legal.disclaimer": "免責事項",
    "legal.streamingPolicy": "ゲーム実況ポリシー",
    "legal.contact": "お問い合わせ",
    "legal.lastUpdated": "最終更新日: 2025年5月13日",

    // Privacy Policy
    "privacy.title": "プライバシーポリシー",
    "privacy.introduction":
      "このプライバシーポリシーでは、Kuso Physicsをご利用いただく際に、お客様の個人情報がどのように収集、使用、共有されるかについて説明します。",
    "privacy.whatWeCollect": "収集する情報",
    "privacy.whatWeCollectText":
      "当社はサービスの提供と改善のために最小限の情報を収集しています。これには以下が含まれます：",
    "privacy.localStorage":
      "ローカルストレージデータ：ゲームの進行状況、カスタムレベル、設定などをブラウザのストレージを使用してデバイスにローカルに保存します。",
    "privacy.noPersonalData": "個人データ：氏名、メールアドレス、支払い情報などの個人情報は収集していません。",
    "privacy.analytics":
      "分析：ユーザーがゲームとどのように相互作用するかを理解するために、匿名の分析を使用する場合があります。",
    "privacy.howWeUse": "情報の使用方法",
    "privacy.howWeUseText": "収集した情報は以下の目的で使用します：",
    "privacy.provideService": "サービスの提供と維持",
    "privacy.improveService": "ゲームの改善と最適化",
    "privacy.dataSharing": "情報の共有",
    "privacy.dataSharingText":
      "当社はこのポリシーに記載されている場合を除き、お客様のデータを第三者に販売または共有することはありません。",
    "privacy.serviceProviders":
      "サービスプロバイダー：当社に代わってサービスを提供する第三者のベンダー（ホスティングプロバイダーなど）と情報を共有する場合があります。",
    "privacy.legalRequirements": "法的要件：法律で要求される場合、情報を開示することがあります。",
    "privacy.dataRetention": "データ保持",
    "privacy.dataRetentionText":
      "ローカルストレージデータは、ブラウザデータをクリアするかアプリケーションをアンインストールするまで、デバイスに残ります。",
    "privacy.userRights": "お客様の権利",
    "privacy.userRightsText": "お客様には以下の権利があります：",
    "privacy.accessData": "当社が保有するお客様に関するデータへのアクセス",
    "privacy.deleteData": "ブラウザのローカルストレージをクリアすることによるデータの削除",
    "privacy.changes": "このプライバシーポリシーの変更",
    "privacy.changesText":
      "当社は、実務の変更を反映するため、または他の運用上、法的、または規制上の理由により、このプライバシーポリシーを随時更新する場合があります。",
    "privacy.contact": "お問い合わせ",
    "privacy.contactText":
      "このプライバシーポリシーについてご質問がある場合は、GitHubリポジトリを通じてお問い合わせください。",

    // Disclaimer
    "disclaimer.title": "免責事項",
    "disclaimer.general": "一般的な免責事項",
    "disclaimer.generalText":
      "Kuso Physicsは、商品性、特定目的への適合性、または非侵害の黙示的保証を含むがこれらに限定されない、いかなる種類の明示的または黙示的な保証もなく「現状のまま」提供されます。",
    "disclaimer.liability": "責任の制限",
    "disclaimer.liabilityText":
      "いかなる場合も、Kuso Physicsの開発者は、ゲームの使用または使用不能から生じるいかなる損害（データまたは利益の損失、または事業中断による損害を含むがこれらに限定されない）についても責任を負いません。",
    "disclaimer.accuracy": "情報の正確性",
    "disclaimer.accuracyText":
      "教育目的のために正確な物理シミュレーションを提供するよう努めていますが、Kuso Physicsの物理はゲームプレイのために簡略化されており、すべての場合において実世界の物理を完全に表現しているわけではありません。",
    "disclaimer.externalLinks": "外部リンク",
    "disclaimer.externalLinksText":
      "Kuso Physicsには、当社が提供または維持していない外部ウェブサイトへのリンクが含まれている場合があります。当社は、これらの外部ウェブサイト上の情報の正確性、関連性、適時性、または完全性を保証しません。",
    "disclaimer.userContent": "ユーザー生成コンテンツ",
    "disclaimer.userContentText":
      "ユーザーはカスタムレベルを作成して共有できます。当社はユーザー生成コンテンツに責任を負わず、その品質、安全性、または合法性を保証することはできません。",

    // Streaming Policy
    "streaming.title": "ゲーム実況ポリシー",
    "streaming.introduction":
      "Kuso Physicsのゲームプレイ体験を、ストリーミング、動画、その他のコンテンツ制作を通じて他の人と共有することを奨励します。",
    "streaming.permission": "一般的な許可",
    "streaming.permissionText":
      "以下のガイドラインに従い、事前の許可なく、YouTube、Twitch、ニコニコ動画、ソーシャルメディアなどのプラットフォームでKuso Physicsを特集したコンテンツを作成し共有することができます。",
    "streaming.monetization": "収益化",
    "streaming.monetizationText": "以下の方法でコンテンツを収益化することができます：",
    "streaming.ads":
      "プラットフォームの広告プログラム（YouTubeパートナープログラム、Twitchアフィリエイト/パートナーなど）",
    "streaming.donations": "視聴者からの寄付や購読",
    "streaming.sponsorships": "チャンネルスポンサーシップ（公式な推薦を暗示しない限り）",
    "streaming.restrictions": "制限事項",
    "streaming.restrictionsText": "以下の活動には事前の書面による許可が必要です：",
    "streaming.commercialUse": "標準的なコンテンツ収益化を超える商業的使用（例：広告にゲーム映像を使用する）",
    "streaming.paidContent": "主にKuso Physicsのゲームプレイで構成されるコンテンツの販売",
    "streaming.misrepresentation": "Kuso Physicsの公式代表者として自分自身を表現すること",
    "streaming.attribution": "帰属表示",
    "streaming.attributionText": "コンテンツの説明に以下を含めてください：",
    "streaming.attributionExample":
      "Kuso PhysicsはKusoGamesによって開発されています。https://github.com/KusoGames/Kuso-Physics",
    "streaming.contentGuidelines": "コンテンツガイドライン",
    "streaming.contentGuidelinesText": "あなたのコンテンツが以下であることを確認してください：",
    "streaming.appropriate": "一般視聴者に適切である",
    "streaming.noHate": "ヘイトスピーチ、差別、または有害な活動を促進しない",
    "streaming.noMisleading": "ゲームの機能や機能性について視聴者を誤解させない",
    "streaming.contactUs": "お問い合わせ",
    "streaming.contactUsText":
      "このストリーミングポリシーについて質問がある場合、または制限された使用のための許可が必要な場合は、GitHubリポジトリを通じてお問い合わせください。",

    // Contact
    "contact.title": "お問い合わせ",
    "contact.text": "質問、フィードバック、またはバグを見つけましたか？ぜひご連絡ください！",
    "contact.github": "GitHubリポジトリ",
    "contact.githubText":
      "当社に連絡する最良の方法は、GitHubリポジトリを通じてです。問題を報告したり、機能を提案したり、プロジェクトに貢献したりすることができます。",
    "contact.githubLink": "GitHubリポジトリにアクセスする",
    "contact.issues": "問題の報告",
    "contact.issuesText": "バグや技術的な問題を見つけた場合は、以下の情報を含む新しい問題をGitHubで作成してください：",
    "contact.issueSteps": "問題を再現する手順",
    "contact.issueBehavior": "期待した動作と実際に起こった動作",
    "contact.issueSystem": "システム情報（ブラウザ、デバイス、OS）",
    "contact.feature": "機能リクエスト",
    "contact.featureText":
      "Kuso Physicsをより良くするアイデアがありますか？あなたの提案を歓迎します！GitHubであなたのアイデアを詳細に説明してください。",

    // Help Page
    "help.title": "Kuso Physicsとは？",
    "help.subtitle": "概要と遊び方",
    "help.introduction":
      "Kuso Physicsへようこそ。このゲームは物理法則を活用して、ボールを目的地まで導く物理パズルゲームです。",

    // Game Overview Section
    "help.overview.title": "ゲーム概要",
    "help.overview.description":
      "Kuso Physicsは、楽しいゲームプレイと実際の物理概念を組み合わせた挑戦的なパズルゲームです。あなたの目標は、重力、運動量、摩擦、その他の物理原理を使用して、ボールをスタート位置からターゲット目的地まで導くことです。",
    "help.overview.features": "主な特徴：",
    "help.overview.feature1": "リアルなボールの動きを再現した物理パズル",
    "help.overview.feature2": "初心者から上級者まで複数の難易度レベル",
    "help.overview.feature3": "自分だけの挑戦を作成できるカスタムレベルエディタ",
    "help.overview.feature4": "物理概念に関する教育的な記事",
    "help.overview.feature5": "他のプレイヤーが作成したレベルの共有とプレイ",

    // How to Play Section
    "help.howToPlay.title": "遊び方",
    "help.howToPlay.description": "ゲームプレイは理解しやすいですが、マスターするのは難しいです：",
    "help.howToPlay.step1.title": "1. ボールをスタートさせる",
    "help.howToPlay.step1.description": "スタートボタンを押してシミュレーションを開始し、ボールを動かします。",
    "help.howToPlay.step2.title": "2. ボールを誘導する",
    "help.howToPlay.step2.description":
      "シェイクモードを使用して、デバイスを振る（モバイル）またはマウスを動かす（デスクトップ）ことでボールの動きに影響を与えます。",
    "help.howToPlay.step3.title": "3. ターゲットに到達する",
    "help.howToPlay.step3.description": "ボールを赤いターゲットリングまで誘導してレベルをクリアします。",
    "help.howToPlay.step4.title": "4. 必要に応じてリセット",
    "help.howToPlay.step4.description":
      "ボールが動けなくなったり、コースから落ちたりした場合は、リセットを押して再試行します。",

    // Controls Section
    "help.controls.title": "操作方法",
    "help.controls.description": "Kuso Physicsはモバイルとデスクトップの両方のユーザーに直感的な操作を提供します：",
    "help.controls.mobile.title": "モバイル操作：",
    "help.controls.mobile.shake": "デバイスを振ってボールに力を加える",
    "help.controls.mobile.touch": "スタート、リセット、ナビゲーション用のタッチボタン",
    "help.controls.mobile.pinch": "ピンチでズームとビューの回転（対応している場合）",
    "help.controls.desktop.title": "デスクトップ操作：",
    "help.controls.desktop.mouse": "マウスを素早く動かしてボールに力を加える（シェイクモード時）",
    "help.controls.desktop.buttons": "スタート、リセット、ナビゲーション用のボタンをクリック",
    "help.controls.desktop.orbit": "クリック＆ドラッグでビューを回転、スクロールでズーム",

    // Game Modes Section
    "help.modes.title": "ゲームモード",
    "help.modes.campaign.title": "キャンペーンモード",
    "help.modes.campaign.description":
      "新しい物理概念を紹介する、徐々に難しくなる事前設計されたレベルを進めていきます。",
    "help.modes.custom.title": "カスタムレベル",
    "help.modes.custom.description":
      "他のユーザーが作成したレベルをプレイするか、レベルエディタを使用して独自のレベルを作成します。",
    "help.modes.editor.title": "レベルエディタ",
    "help.modes.editor.description":
      "内蔵エディタで独自の物理パズルをデザインします。プラットフォームを配置し、バウンスと摩擦のプロパティを設定し、開始点と終了点を定義して、あなたの作品を他の人と共有しましょう。",

    // Tips and Tricks Section
    "help.tips.title": "ヒントとコツ",
    "help.tips.intro": "ゲームプレイを向上させるためのいくつかの役立つヒント：",
    "help.tips.tip1.title": "運動量を活用する",
    "help.tips.tip1.description": "下り坂でボールに速度を蓄積させ、上り坂を登るのを助けましょう。",
    "help.tips.tip2.title": "バウンス特性を理解する",
    "help.tips.tip2.description":
      "ピンク/紫のプラットフォームは緑のものよりもバウンス特性が高くなっています。これらを使用して高い場所に到達しましょう。",
    "help.tips.tip3.title": "力をコントロールする",
    "help.tips.tip3.description":
      "ボールが正確な誘導を必要とする場合は、穏やかな力を加えましょう。力が強すぎるとコースから外れる可能性があります。",
    "help.tips.tip4.title": "レイアウトを研究する",
    "help.tips.tip4.description": "開始前に、レベルを分析してアプローチを計画する時間を取りましょう。",
    "help.tips.tip5.title": "物理記事から学ぶ",
    "help.tips.tip5.description":
      "ゲーム内の物理記事を読んで、ゲームメカニクスを支配する原理をより深く理解しましょう。",

    // FAQ Section
    "help.faq.title": "よくある質問",
    "help.faq.q1": "シェイクモードが私のデバイスで動作しないのはなぜですか？",
    "help.faq.a1":
      "モバイルデバイスの場合、モーションセンサーの権限を付与する必要があります。これらの権限が有効になっていることを確認するには、ブラウザの設定を確認してください。",
    "help.faq.q2": "カスタムレベルを保存するにはどうすればよいですか？",
    "help.faq.a2":
      "レベルエディタで、レベルをデザインした後に保存ボタンをクリックします。カスタムレベルはブラウザのローカルストレージに保存されます。",
    "help.faq.q3": "Kuso Physicsをオフラインでプレイできますか？",
    "help.faq.a3":
      "はい！一度読み込まれると、ゲームはオフラインでプレイできます。また、対応デバイスではプログレッシブウェブアプリ（PWA）としてインストールすることもできます。",
    "help.faq.q4": "カスタムレベルを友達と共有するにはどうすればよいですか？",
    "help.faq.a4":
      "レベルを保存した後、エクスポートボタンを使用してJSONファイルとしてエクスポートできます。友達はこのファイルを自分のゲームにインポートできます。",
    "help.faq.q5": "ボールが時々動けなくなるのはなぜですか？",
    "help.faq.a5":
      "これは物理シミュレーションの制限やレベルデザインによって発生する可能性があります。小さな力を加えて動かすか、必要に応じてレベルをリセットしてみてください。",

    // Navigation
    "nav.help": "ヘルプ",
  },
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Create the provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Move the useState hook inside the component function
  const [language, setLanguageState] = useState<Language>(() => {
    // Use a default value initially
    let defaultLang: Language = "en"

    // Only access browser APIs on the client side
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ja")) {
        defaultLang = savedLanguage
      } else {
        // Check browser language
        const browserLang = navigator.language.split("-")[0]
        if (browserLang === "ja") defaultLang = "ja"
      }
    }

    return defaultLang
  })

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  // Function to set the language
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
  }

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value))
      })
    }

    return text
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  return useContext(LanguageContext)
}

export const useTranslation = () => {
  return useContext(LanguageContext).t
}
