TEMPLATE += app

QT += qml quick bluetooth

# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp \
    src/qtquick2applicationviewer.cpp \
    src/blescanner.cpp \
    src/bledeviceinfo.cpp

# Installation path
# target.path =

# Please do not modify the following two lines. Required for deployment.
include(src/qtquick2applicationviewer.pri)
#qtcAddDeployment()

RESOURCES += \
    resources.qrc

DISTFILES += \
    qmldir

HEADERS += \
    src/qtquick2applicationviewer.h \
    src/blescanner.h \
    src/bledeviceinfo.h
