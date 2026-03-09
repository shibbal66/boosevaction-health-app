package com.boosevacation

import com.facebook.react.views.text.ReactFontManager

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    ReactFontManager.getInstance().addCustomFont(this, "SF Pro Text", R.font.sf_pro_text)
    ReactFontManager.getInstance().addCustomFont(this, "SF Pro Rounded", R.font.sf_pro_rounded)
    loadReactNative(this)
  }
}
